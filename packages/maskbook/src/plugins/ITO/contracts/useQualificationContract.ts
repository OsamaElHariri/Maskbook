import type { AbiItem } from 'web3-utils'
import type { Qualification } from '@dimensiondev/contracts/types/Qualification'
import type { Qualification2 } from '@dimensiondev/contracts/types/Qualification2'
import QualificationABI from '@dimensiondev/contracts/abis/Qualification.json'
import Qualification2ABI from '@dimensiondev/contracts/abis/Qualification2.json'
import { ITO_CONSTANTS } from '../constants'
import { useContract, isSameAddress, useConstantNext } from '@masknet/web3-shared'

export function useQualificationContract(address: string, ito_address: string) {
    const ITO_CONTRACT_ADDRESS = useConstantNext(ITO_CONSTANTS).ITO_CONTRACT_ADDRESS
    const QLF_CONTRACT = useContract<Qualification>(address, QualificationABI as AbiItem[])
    const QLF2_CONTRACT = useContract<Qualification2>(address, Qualification2ABI as AbiItem[])

    return isSameAddress(ito_address, ITO_CONTRACT_ADDRESS)
        ? {
              version: 1,
              contract: QLF_CONTRACT,
          }
        : {
              version: 2,
              contract: QLF2_CONTRACT,
          }
}
