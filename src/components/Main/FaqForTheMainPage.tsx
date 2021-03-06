import { FC } from 'react';
import {
	Container,
	Center,
	Heading,
	Text,
	VStack
} from '@chakra-ui/react';
import { FaqAccordion } from '../Faq/FaqAccordion';


export const FaqForTheMainPage: FC = () => {
	return (
		<VStack w={['auto', 'auto', 'auto', 'auto', '50%']} id='faq'>
			<Center p={10}>
				<Heading size='3xl'>
					<Text
						bgGradient='linear(90deg, #ff3737, #c13f8e)'
						backgroundClip='text'
						fontFamily={`'Kdam Thmor Pro', sans-serif`}
					>
						FAQ
					</Text>
				</Heading>
			</Center>
			<FaqAccordion />
		</VStack>
	);
}
