import { FC, useEffect } from 'react';
import { HStack } from '@chakra-ui/layout'
import { ActionsTabs } from '../Swap/ActionsTabs';

import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import { useWalletHandleError } from '../../hooks/useWalletHandleError';
import { useEagerConnect, useInactiveListener } from '../../hooks/useWeb3'
import { useUserStore } from '../../stores/UserStore';

export const SwapMain: FC = () => {

	const { setActivatingConnector, activatingConnector } = useUserStore();
	const { connector } = useWeb3React<Web3Provider>();

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
		  setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	// handle logic to eagerly connect to the injected ethereum provider,
	// if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the
	// injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)
	useWalletHandleError();
    return (
		<>
			<Header />
			<HStack
				w="full"
				h="100vh"
				justifyContent="center"
			>
				<ActionsTabs />
			</HStack>
			<Footer />
		</>
    )
}
