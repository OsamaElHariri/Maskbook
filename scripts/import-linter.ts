/// <reference lib="esnext" />

const path: typeof import('path') = require('path')
const ts: typeof import('ts-morph') = require('ts-morph')
import { SourceFile, Project } from 'ts-morph'

const project = new ts.Project({
    addFilesFromTsConfig: true,
    tsConfigFilePath: path.join(__dirname, '../tsconfig.json'),
})

// for (const each of project.getSourceFiles()) {
//     console.log(each.getFilePath())
// }

// Task 1: Ban imports from background page
const background = project.getSourceFileOrThrow(path.join(__dirname, '../src/background-service.ts'))

const checkedList = new Set<SourceFile>()
checkedList.add(project.getSourceFileOrThrow(path.join(__dirname, '../src/utils/safeRequire.ts')))
const diags = checkReferenceRecursive(project, background, getChecker(), checkedList, [background.getFilePath()])
if (diags) {
    throw 'There is diagnostics generated by the linter. Please fix them before continue.'
}

function getChecker(): (path: string) => string | null {
    return x => {
        if (x.includes('@material-ui')) {
            return `@material-ui appears in the import chain!
To write a cross context file, use safeMUI() inside the function to import them conditionally.
`
        } else if (x === 'react') {
            return `React appears in the import chain!
To write a cross context file, use safeReact() inside the function to import them conditionally.
`
        }
        return null
    }
}

function checkReferenceRecursive(
    project: Project,
    file: SourceFile,
    getDiagnostics: (path: string) => string | null,
    checkedSourceFiles: Set<SourceFile>,
    referenceChain: readonly string[],
    hasDiagnostics: boolean = false,
): boolean {
    if (checkedSourceFiles.has(file)) return hasDiagnostics
    checkedSourceFiles.add(file)
    console.log('Checking ', file.getFilePath())
    const ls = project.getLanguageService()

    const esModuleStyleImport: string[] = []
    for (const dependency of file.getImportDeclarations()) {
        let isTypeOnlyImport = true

        // We consider default import and ns import is not type only import
        if (dependency.getDefaultImport() || dependency.getNamespaceImport()) {
            isTypeOnlyImport = false
        } else {
            const namedImport = dependency.getNamedImports()
            for (const x of namedImport) {
                try {
                    const symbol = x.getSymbol()
                    if (!symbol) continue
                    // We get value declarations here.
                    // notice, some value has type scope decl and value scope decl at the same time
                    // like class and namespace. we consider this as a value type import
                    // because typescript will not remove it.

                    outer: for (const decls of symbol.getDeclarations()) {
                        for (const refNodes of ls.findReferencesAsNodes(decls).filter(ts.TypeGuards.isIdentifier)) {
                            for (const def of refNodes.getDefinitions()) {
                                const kind = def.getKind()
                                // ScriptElementKind
                                if (['interface', 'type', 'primitiveType'].includes(kind) === false) {
                                    isTypeOnlyImport = false
                                    break outer
                                }
                            }
                        }
                    }
                } catch (e) {
                    isTypeOnlyImport = false
                }
            }
            // import 'lib'
            if (namedImport.length === 0) isTypeOnlyImport = false
        }

        if (isTypeOnlyImport) {
            continue
        }

        const path = dependency.getModuleSpecifierValue()
        esModuleStyleImport.push(path)
    }
    const nodeStyleRequires: string[] = []
    file.transform(traversal => {
        const node = traversal.visitChildren()
        // require('...')
        if (!ts.ts.isCallExpression(node)) return node
        if (!ts.ts.isIdentifier(node.expression)) return node
        if (node.expression.text !== 'require') return node

        const first = node.arguments[0]
        if (!ts.ts.isStringLiteralLike(first)) return node
        nodeStyleRequires.push(first.text)
        return node
    })

    for (const path of esModuleStyleImport.concat(nodeStyleRequires)) {
        // the ../ is used to tramsform "a/x.ts" to "a"
        const targetSFPath = require('path').join(file.getFilePath(), '../', path)
        const diag = getDiagnostics(path)
        const sf =
            path.startsWith('.') &&
            (project.getSourceFile(targetSFPath + '.ts') ||
                project.getSourceFile(targetSFPath + '.tsx') ||
                project.getSourceFile(targetSFPath + '/index.ts') ||
                project.getSourceFile(targetSFPath + '/index.tsx'))

        const nextRefChain: string[] = referenceChain.concat([sf ? sf.getFilePath() : path])
        if (diag) {
            console.error(`${diag}
Import chain:
${nextRefChain.map(x => '  => ' + x).join('\n')}
`)
            hasDiagnostics = true
        }
        if (sf) {
            hasDiagnostics =
                checkReferenceRecursive(
                    project,
                    sf,
                    getDiagnostics,
                    checkedSourceFiles,
                    nextRefChain,
                    hasDiagnostics,
                ) || hasDiagnostics
        }
    }
    return hasDiagnostics
}
