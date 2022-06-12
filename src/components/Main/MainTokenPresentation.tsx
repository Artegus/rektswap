import { FC, useEffect } from 'react';

import {
	Heading,
	Flex, Box, HStack,
	Text
} from '@chakra-ui/layout';

import { RektText } from '../Logo/RektText';
import { 
	useViewportScroll,
	useTransform,
	motion 
} from 'framer-motion';

export const MainTokenPresentation: FC = () => {
	
	const { scrollY } = useViewportScroll();
	const titleY = useTransform(scrollY, [0, 500], [0, 100]);
	const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
	const secondaryTitleColor = useTransform(scrollY, [0, 300], ['#fff', '#8247E5']);
	
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
			<motion.div 
				className='title' 
				style={{
					y: titleY,
					zIndex: -1,
					opacity: titleOpacity
				}}
			>
				<RektText
					asHeading
					otherProps={{
						textAlign: 'center',
						fontSize: { base: '6xl', md: '7xl', lg: '9xl' },
						flex: 2,
					}}
				/>
			</motion.div>
			<Heading
				color='1a202c'
				textAlign='left'
				fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
			>
				<motion.div style={{color:secondaryTitleColor, display: 'inline'}}>
					REKT
				</motion.div>coin is an experimental shitcoin
				that randomly deflates using Chainlink
				random numbers.
			</Heading>
		</Flex>
	);

}
