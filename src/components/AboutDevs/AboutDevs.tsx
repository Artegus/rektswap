import { FC } from 'react';
import {
	Box,
	Center,
	Heading,
	Text,
	VStack,
	HStack,
	Flex,
	SimpleGrid
} from '@chakra-ui/react';

import { DevCard } from './DevCard';

const backendDevImg =
	'https://avatars.githubusercontent.com/u/39626597?v=4';
const frontendDevImg = 
	'https://avatars.githubusercontent.com/u/51178465?v=4';

export const AboutDevs: FC = () => {
	return (
		<Center>
			<VStack mb='10%'>
				<Heading size='3xl' mb={5}>
					<Text
						bgGradient='linear(270deg, #ff3737, #8247E5)'
						backgroundClip='text'
						fontFamily={`'Kdam Thmor Pro', sans-serif`}
					>
						OUR TEAM	
					</Text>
				</Heading>
				<HStack
					//direction={['column', 'column','row']} 
					gap={[3, 3, 10]}
				>
					<DevCard 
						img={backendDevImg} 
						title='Dennis'
						description='back-end dev'
						href='https://github.com/DennisDv24/rekt'
					/>
					<DevCard 
						img={frontendDevImg} 
						title='Artegus'
						description='front-end dev'
						href='https://github.com/Artegus/rektswap'
					/>
				</HStack>
			</VStack>
		</Center>
	);
}


