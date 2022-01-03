import { FC } from 'react'
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const POLLING_INTERVAL = 12_000;

const getLibrary = (provider: any) : Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = POLLING_INTERVAL;
    return library
}

const web3Provider: FC = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary} >
            { children }
        </Web3ReactProvider>
    )
}

export default web3Provider;
