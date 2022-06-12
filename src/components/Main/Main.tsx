import { FC } from 'react';

import { Flex } from '@chakra-ui/layout';

import { FaqHeader as MainHeader } from '../Faq/FaqHeader';
import { MainTokenPresentation } from './MainTokenPresentation';
import { FaqForTheMainPage } from './FaqForTheMainPage';
import { Roadmap } from '../Roadmap/Roadmap';
import { Particle } from '../Particle/Particle';
import { HomeLinks } from '../HomeLinks/HomeLinks';
import { AboutDevs } from '../AboutDevs/AboutDevs';

export const Main: FC = () => {
	return (
		<Flex
			py={2}
			px={5}
			direction={'column'}
		>
			<Particle />
			<MainHeader />
			<MainTokenPresentation />
			<Flex
				direction={['column', 'column', 'row']}
				gap={[10, 10, 10, 10, 20]}
				mx={[0, 0, 0, '10%', '15%']}
				mb={10}
			>
				<FaqForTheMainPage />
				<Roadmap />
			</Flex>
			<HomeLinks />
			<AboutDevs />
		</Flex>
	);
}
