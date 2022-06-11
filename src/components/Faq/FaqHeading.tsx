import React from 'react';
import { FC } from 'react';

import {
	Heading,
	Center, 
	Text,
	Flex,
	HStack
} from '@chakra-ui/react'

export const FaqHeading: FC = () => {
	return (
		<Center p={10}>
			<Heading size='4xl'>
				<Text
					bgGradient='linear(270deg, #ff3737, #8247E5)'
					backgroundClip='text'
					fontFamily={`'Kdam Thmor Pro', sans-serif`}
				>REKT </Text>
				<Center>
				<Text
					fontSize='4xl'
					fontFamily={`'Kdam Thmor Pro', sans-serif`}
				>
					FAQ
				</Text>
				</Center>
			</Heading>
		</Center>
	);
}
