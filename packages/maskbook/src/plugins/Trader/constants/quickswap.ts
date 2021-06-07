import { ChainId, ERC20TokenDetailed } from '@dimensiondev/web3-shared'
import { WETH_ONLY, DAI, USDC, USDT, COMP, QUICK, ETHER, UNITOKEN, EASY, IGG, WBTC, OM, TT01, TT02 } from './trader'

/**
 * Some tokens can only be swapped via certain pairs,
 * so we override the list of bases that are considered for these tokens.
 */
export const QUICKSWAP_CUSTOM_BASES: {
    readonly [chainId in ChainId]?: {
        [tokenAddress: string]: ERC20TokenDetailed[]
    }
} = {}

export const QUICKSWAP_BASE_AGAINST_TOKENS: {
    readonly [chainId in ChainId]: ERC20TokenDetailed[]
} = {
    ...WETH_ONLY,
    [ChainId.Matic]: [WETH_ONLY, DAI, USDC, USDT, COMP, QUICK, ETHER, UNITOKEN, EASY, IGG, WBTC, OM, TT01, TT02].map(
        (x) => x[ChainId.Matic] as ERC20TokenDetailed,
    ),
}

export const THEGRAPH_QUICKSWAP = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap'

export const QUICKSWAP_INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
