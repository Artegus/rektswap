import React from 'react';
import { FC } from 'react';
import { FaqContents } from './FaqContents';
import { FaqHeader } from './FaqHeader';
import { Footer } from '../Footer/Footer';

import {
	Container,
	Flex,
	Box,
	VStack, 
	HStack
} from '@chakra-ui/react'

export const Faq: FC = () => {
	return (
			<Flex
				h={{ base: '100vh' }}
				py={2}
				px={5}
				direction={'column'}
			>
				<FaqHeader />
				<FaqContents/>
			</Flex>
	);
}


