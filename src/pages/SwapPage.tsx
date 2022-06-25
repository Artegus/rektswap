import { FC } from 'react';
import {
  Flex,
} from '@chakra-ui/layout';
import { SwapMain } from '../components/SwapMain/SwapMain';
import { Particle } from '../components/Particle/Particle';

import '../providers/chakra/styles.css';

export const SwapPage: FC = () => {
	
  return (
      <Flex
        h={{ base: '100vh' }}
        py={2}
        px={5}
        direction={'column'}
      >
		<Particle delicate />
        <SwapMain />
      </Flex>
  );
}
