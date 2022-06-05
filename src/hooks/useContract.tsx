import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract, providers } from 'ethers'
import { useMemo } from 'react'
import { defaultContracts } from '../config/constants/tokenLists/default.contracts';

import REKTCOIN_ABI from '../abis/rektcoin.json';
import REKT_TXS_BATCHER from '../abis/rektcoinBatch.json';
import WETH_ABI from '../abis/weth.json';
import { RektContract } from '../Contracts/RektContract';
import { RektTransactionBatcher } from '../Contracts/RektTransactionBatcher';
import { config } from '../config/config';

export const useContract = <T extends Contract>(address: string, ABI: any): T | null => {

    const { account, library, chainId } = useWeb3React<Web3Provider>();

    return useMemo(() => {
        if (!library || !chainId) return null
        if (!address) return null

        try {
            return getContract<T>(address, ABI, library, account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [library, chainId, account]);

}

export const useRektContract = () => {
    return useContract<RektContract>(defaultContracts.REKT_COIN.address, REKTCOIN_ABI);
}

export const useRektTxsBatcherContract = () => {
    return useContract<RektTransactionBatcher>(defaultContracts.REKT_TRANSACTION_BATCHER.address, REKT_TXS_BATCHER);
}

export const useWethContract = () => {
    return useContract(defaultContracts.WETH.address, WETH_ABI)
}

export const useContractOnlyRead = (address: string, abi: any) => {
    let provider;

    if (window.ethereum) {
        provider = new providers.Web3Provider(window.ethereum);
    } else {
        provider = new providers.JsonRpcProvider(config.INFURA_ENDPOINT);
    }

    return new Contract(address, abi, provider);
}

function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

function getContract<T extends Contract>(address: string, ABI: any, library: JsonRpcProvider, account?: string): T {
    return new Contract(address, ABI, getProviderOrSigner(library, account) as any) as T;
}