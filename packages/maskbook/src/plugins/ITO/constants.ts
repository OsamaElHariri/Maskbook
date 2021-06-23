import { ChainId } from '@masknet/web3-shared'

export const ITO_MetaKey = 'com.maskbook.ito:1'
export const ITO_PluginID = 'com.maskbook.ito'

export const ITO_EXCHANGE_RATION_MAX = 6

export const ITO_CONSTANTS = {
    ITO_CONTRACT_ADDRESS: {
        [ChainId.Mainnet]: '0xf110fec3075d7531141b6bf16b11604cb028a17b',
        [ChainId.Ropsten]: '',
        [ChainId.Rinkeby]: '0x7751b8c715d1Df74D181C86aE01801330211f370',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: '',
        [ChainId.BSCT]: '',
        [ChainId.Matic]: '',
        [ChainId.Mumbai]: '',
    },
    MASK_ITO_CONTRACT_ADDRESS: {
        [ChainId.Mainnet]: '0x86812da3A623ab9606976078588b80C315E55FA3',
        [ChainId.Ropsten]: '0x0b0d7efb4a09d818e9dcd609246f10fc6286b8df',
        [ChainId.Rinkeby]: '0x0aC41A27bA9F132D5687CAC986f5302Da6f5F9f6',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: '',
        [ChainId.BSCT]: '',
        [ChainId.Matic]: '',
        [ChainId.Mumbai]: '',
    },
    ITO2_CONTRACT_ADDRESS: {
        [ChainId.Mainnet]: '0xc2CFbF22d6Dc87D0eE18d38d73733524c109Ff46',
        [ChainId.Ropsten]: '0xBD4c3Cf084B6F4d25430Ee5d44436e860Cc58Ee4',
        [ChainId.Rinkeby]: '',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: '0x96c7D011cdFD467f551605f0f5Fce279F86F4186',
        [ChainId.BSCT]: '0x981be454a930479d92C91a0092D204b64845A5D6',
        [ChainId.Matic]: '0xF9F7C1496c21bC0180f4B64daBE0754ebFc8A8c0',
        [ChainId.Mumbai]: '0x54a0A221C25Fc0a347EC929cFC5db0be17fA2a2B',
    },
    DEFAULT_QUALIFICATION_ADDRESS: {
        [ChainId.Mainnet]: '0x81b6ae377e360dcad63611846a2516f4ba8c88ac',
        [ChainId.Ropsten]: '',
        [ChainId.Rinkeby]: '0x88AA0AB3B7cDE263073e1cBa1D06473adeC1b38E',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: '',
        [ChainId.BSCT]: '0x54a0A221C25Fc0a347EC929cFC5db0be17fA2a2B',
        [ChainId.Matic]: '0x02Ea0720254F7fa4eca7d09A1b9C783F1020EbEF',
        [ChainId.Mumbai]: '0x5B966f3a32Db9C180843bCb40267A66b73E4f022',
    },
    DEFAULT_QUALIFICATION2_ADDRESS: {
        [ChainId.Mainnet]: '0x4dC5f343Fe57E4fbDA1B454d125D396A3181272c',
        [ChainId.Ropsten]: '0xd5e6434bde165062b3d9572DEFd6393c7B3E2902',
        [ChainId.Rinkeby]: '',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: '0xAb7B1bE4233A04e5C43a810E75657ECED8E5463B',
        [ChainId.BSCT]: '',
        [ChainId.Matic]: '0x2cf91AD8C175305EBe6970Bd8f81231585EFbd77',
        [ChainId.Mumbai]: '',
    },
    SUBGRAPH_URL: {
        [ChainId.Mainnet]: 'https://api.thegraph.com/subgraphs/name/dimensiondev/mask-ito-mainnet',
        [ChainId.Ropsten]: 'https://api.thegraph.com/subgraphs/name/dimensiondev/mask-ito',
        [ChainId.Rinkeby]: '',
        [ChainId.Kovan]: '',
        [ChainId.Gorli]: '',
        [ChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/dimensiondev/mask-ito-bsc-mainnet',
        [ChainId.BSCT]: '',
        [ChainId.Matic]: 'https://api.thegraph.com/subgraphs/name/dimensiondev/mask-ito-polygon',
        [ChainId.Mumbai]: '',
    },
}

export const ITO_CONTRACT_BASE_TIMESTAMP = new Date('2021-03-29T00:00:00.000Z').getTime()

export const TIME_WAIT_BLOCKCHAIN = 30000
// Keccak-256(ifQualified(address)) XOR Keccak-256(logQualified(address,uint256))
export const QUALIFICATION_INTERFACE_ID = '0xfb036a85'
// Keccak-256(ifQualified(address,bytes32[])) XOR Keccak-256(logQualified(address,bytes32[]))
export const QUALIFICATION2_INTERFACE_ID = '0x6762aec5'
// Keccak-256(get_start_time())
export const QUALIFICATION_HAS_START_TIME_INTERFACE_ID = '0xdf29dfc4'
// Keccak-256(isLucky(address))
export const QUALIFICATION_HAS_LUCKY_INTERFACE_ID = '0xadaa0f8a'

export const MSG_DELIMITER = '2c1aca02'

// for estimate gas
export const FAKE_SIGN_PASSWORD = '0x75466cc969717b172b14253aaeebdc958f2b5037a852c1337650ed4978242dd9'
