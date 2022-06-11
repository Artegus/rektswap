import React from 'react';
import { FC } from 'react';

import {
	Box,
	Flex, 
	HStack, 
	SimpleGrid,
	Center, 
	Grid,
	Container,
	Heading,
	Text
} from '@chakra-ui/layout';

import { FaqHeader as MainHeader } from '../Faq/FaqHeader';
import { MainTokenPresentation } from './MainTokenPresentation';
import { FaqForTheMainPage } from './FaqForTheMainPage';
import { Roadmap } from '../Roadmap/Roadmap';

export const Main: FC = () => {
	return (
		<Flex
			h={{ base: '100vh' }}
			py={2}
			px={5}
			direction={'column'}
		>
			<MainHeader />
			<MainTokenPresentation />
			<Center>
				<Flex 
					direction={['column', 'column','row']} 
					gap={[10, 10, 10, 10, 20]}
					mx={[0, 0, 0, '10%', '15%']}
				>
					<FaqForTheMainPage />
					<Roadmap />
				</Flex>
			</Center>
		</Flex>
	);
}
