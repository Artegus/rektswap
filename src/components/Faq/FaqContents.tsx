import React from 'react';
import { FC } from 'react';
import { Container } from '@chakra-ui/react'

import { FaqHeading } from './FaqHeading';
import { FaqAccordion } from './FaqAccordion';

export const FaqContents: FC = () => {
	return (
		<Container px={-5} h='100vh' pb={5}>
			<FaqHeading />
			<FaqAccordion />
		</Container>
	);
}

