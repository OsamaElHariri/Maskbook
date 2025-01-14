import { createIcon } from '../utils'
import type { SvgIcon } from '@material-ui/core'

export const FileServiceIcon: typeof SvgIcon = createIcon(
    'FileService',
    <g>
        <path
            opacity=".5"
            d="M5.25 7.547a3.5 3.5 0 013.5-3.5h10.5a3.5 3.5 0 013.5 3.5v14a3.5 3.5 0 01-3.5 3.5H8.75a3.5 3.5 0 01-3.5-3.5v-14z"
            fill="#AFC3E1"
        />
        <path opacity=".1" d="M22.75 11.895V7.547a3.5 3.5 0 00-3.5-3.5h-4.347l7.847 7.848z" fill="#AFC3E1" />
        <path d="M14.903 4.047v4.348a3.5 3.5 0 003.5 3.5h4.347l-7.847-7.848z" fill="#AFC3E1" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.19 13.316a1.601 1.601 0 00-1.188-.55c-.438 0-.867.192-1.189.55a2.06 2.06 0 00-.51 1.374v1.472h3.398V14.69a2.06 2.06 0 00-.51-1.374zm1.19 2.846V14.69c0-.68-.243-1.338-.684-1.828a2.28 2.28 0 00-1.694-.776 2.28 2.28 0 00-1.694.776 2.738 2.738 0 00-.684 1.828v1.472h-.266c-.598 0-1.094.478-1.094 1.081v2.594c0 .603.496 1.081 1.094 1.081h5.284c.599 0 1.095-.478 1.095-1.08v-2.595c0-.603-.496-1.08-1.095-1.08h-.262zm.678 1.081a.408.408 0 00-.416-.401h-5.284a.408.408 0 00-.415.401v2.594c0 .216.18.402.415.402h5.284a.408.408 0 00.416-.402v-2.594z"
            fill="#fff"
        />
    </g>,
    '0 0 28 28',
)
