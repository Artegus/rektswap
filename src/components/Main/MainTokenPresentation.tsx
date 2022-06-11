import { FC } from 'react';

import {
	Heading,
	Flex, Box, HStack
} from '@chakra-ui/layout';

import { RektText } from '../Logo/RektText';

export const MainTokenPresentation: FC = () => {
	return (
		<Flex
			minH="100vh"
			gap={6}
			flexWrap='wrap'
			flexFlow={['wrap', 'wrap', 'wrap']}
			flexDirection={['row', 'row', 'row']}
			alignContent='center'
			alignItems='center'
			px={['10vw', '10vw', '10vw', '25vw', '30vw']}
		>
			<RektText
				asHeading
				otherProps={{
					textAlign: 'center',
					fontSize: { base: '4xl', md: '5xl', lg: '6xl' },
					flex: 2
				}}
			/>
			<Heading
				color='1a202c'
				textAlign='left'
				fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
			>
				REKT is an experimental shitcoin
				that randomly deflates using Chainlink
				random numbers.
			</Heading>
		</Flex>
	);

}
