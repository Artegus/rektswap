import {
  Container, Flex,
} from '@chakra-ui/layout';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { FC, useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { useWalletHandleError } from './hooks/useWalletHandleError';
import { useEagerConnect, useInactiveListener } from './hooks/useWeb3'
import { useUserStore } from './stores/UserStore';

import './providers/chakra/styles.css';

export const SwapPage: FC = () => {

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
    <Container maxW="100vw" p={0} m={0} >
      <Flex
        h={{ base: '100vh' }}
        py={2}
        px={5}
        direction={'column'}
      >
        <Header />
        <Main />
        <Footer />
      </Flex>
    </Container>
  );
}
