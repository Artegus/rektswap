import { 
  Container, Flex,
} from '@chakra-ui/layout';
import { FC } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

const App: FC = () => {
  return (
    <Container maxW="100vw" p={0} >
      <Flex
        h={{ base: '100vh' }}
        py={0} 
        direction={'column'}
      >
        <Header/>
        <Main/>
      </Flex>
    </Container>
  );
}

export default App;
