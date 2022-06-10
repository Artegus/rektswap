import React from 'react';
import { FC } from 'react';
import { FaqAccordion } from './FaqAccordion';
import { FaqHeader } from './FaqHeader';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Container
} from '@chakra-ui/react'

export const Faq: FC = () => {
	return (
		<>
		<FaqHeader />
		<FaqAccordion />
		</>
	);
}


