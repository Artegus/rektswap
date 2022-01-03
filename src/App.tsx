import {
  Container, Flex,
} from '@chakra-ui/layout';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { FC, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { useEagerConnect, useInactiveListener } from './hooks/useWeb3'
import { useUserStore } from './stores/UserStore';

const App: FC = () => {

  const { setActivatingConnector, activatingConnector } = useUserStore();
  const context = useWeb3React<Web3Provider>()
  const { connector, error } = context;

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <Container maxW="100vw" p={0} >
      <Flex
        h={{ base: '100vh' }}
        py={0}
        direction={'column'}
      >
        <Header />
        <Main />
      </Flex>
    </Container>
  );
}

export default App;
