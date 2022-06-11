import React from 'react';
import { FC } from 'react';

import {
	SimpleGrid,
	Box,
	Container,
	Center, 
	Heading,
	Text
} from '@chakra-ui/layout';

import { RektText } from '../Logo/RektText';

export const MainTokenPresentation: FC = () => {
	return (
		<Container maxW='50%' h='100vh'>
		<Center h='100vh'>
			<SimpleGrid columns={2} minChildWidth='200px' spacing='40px'>
				<Center>
				<Heading color='1a202c'>
					REKT is an experimental shitcoin
					that randomly deflates using Chainlink
					random numbers.
				</Heading>				
				</Center>
				<Center h='100%'>
					<RektText asHeading fontSize='6xl'/>
				</Center>
			</SimpleGrid>
		</Center>
		</Container>
	);

}
