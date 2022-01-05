import { FC } from 'react'

import {
    Button
} from '@chakra-ui/react'
import { useUserStore } from '../../stores/UserStore'
import { connectorsByName } from '../../connectors';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

export const ConnectWallet: FC = () => {

    const { activate, active, chainId } = useWeb3React<Web3Provider>()
    const { setActivatingConnector } = useUserStore();

    const connectWallet = async () => {
        setActivatingConnector(connectorsByName['Injected'])
        try {
            await activate(connectorsByName['Injected'])
        } catch (e) {
            console.error(e); // TODO: Handle error
        }
    }

export const ConnectWallet: FC = () => {

    return (
        <Button size='md'
            onClick={connectWallet}
        >
            Connect wallet
        </Button>
    )
}
