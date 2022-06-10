import React from 'react';
import { FC } from 'react';
import { FaqAccordion } from './FaqAccordion';
import { FaqHeading } from './FaqHeading';
import { FaqHeader } from './FaqHeader';
import { Footer } from '../Footer/Footer';

import {
	Container,
	Flex,
	Box
} from '@chakra-ui/react'

export const Faq: FC = () => {
	return (
		<Container maxW='100vw' p={0} m={0} >
			<Flex
				h={{ base: '100vh' }}
				py={2}
				px={5}
				direction={'column'}
			>
				<FaqHeader />
				<FaqHeading />
				<FaqAccordion />
				<Box px={[2, 0, 0, 0]} py={[2, 0, 0, 0]}>
					<Footer />
				</Box>
			</Flex>
		</Container>
	);
}


