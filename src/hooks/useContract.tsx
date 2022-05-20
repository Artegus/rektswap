import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers'
import { useMemo } from 'react'
import { defaultContracts } from '../config/constants/tokenLists/default.contracts';

import REKTCOIN_ABI from '../abis/rektcoin.json';
import REKT_TXS_BATCHER from '../abis/rektcoinBatch.json';
import WETH_ABI from '../abis/weth.json';

export const useContract = (address: string, ABI: any) => {

    const { account, library, chainId } = useWeb3React<Web3Provider>();

    return useMemo(() => {
        if (!library || !chainId) return null
        if (!address) return null

        try {
            return getContract(address, ABI, library, account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [library, chainId, account]);

}

export const useRektContract = () => {
    return useContract(defaultContracts.REKT_COIN.address, REKTCOIN_ABI);
}

export const useRektTxsBatcherContract = () => {
    return useContract(defaultContracts.REKT_TRANSACTION_BATCHER.address, REKT_TXS_BATCHER);
}

export const useWethContract = () => {
    return useContract(defaultContracts.WETH.address, WETH_ABI)
}

function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

function getContract(address: string, ABI: any, library: JsonRpcProvider, account?: string): Contract {
    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}