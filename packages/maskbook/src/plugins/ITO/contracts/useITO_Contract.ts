import type { AbiItem } from 'web3-utils'
import ITO_ABI from '@dimensiondev/contracts/abis/ITO.json'
import ITO2_ABI from '@dimensiondev/contracts/abis/ITO2.json'
import type { ITO } from '@dimensiondev/contracts/types/ITO'
import type { ITO2 } from '@dimensiondev/contracts/types/ITO2'
import { ITO_CONSTANTS } from '../constants'
import { useConstantNext, useContract, isSameAddress } from '@masknet/web3-shared'

export function useITO_Contract(contractAddress?: string) {
    const ITO_CONTRACT_ADDRESS = useConstantNext(ITO_CONSTANTS).ITO_CONTRACT_ADDRESS
    const ITO2_CONTRACT_ADDRESS = useConstantNext(ITO_CONSTANTS).ITO2_CONTRACT_ADDRESS
    const ITO_CONTRACT = useContract<ITO>(ITO_CONTRACT_ADDRESS, ITO_ABI as AbiItem[])
    const ITO2_CONTRACT = useContract<ITO2>(ITO2_CONTRACT_ADDRESS, ITO2_ABI as AbiItem[])

    return contractAddress && isSameAddress(contractAddress, ITO_CONTRACT_ADDRESS)
        ? { contract: ITO_CONTRACT, version: 1 }
        : { contract: ITO2_CONTRACT, version: 2 }
}
