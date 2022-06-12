import { FC } from 'react';

import {
	Image,
	Box,
	VStack,
	HStack,
	Text,
	Avatar,
	Button,
	Link
} from '@chakra-ui/react';

export const DevCard:FC<{
	img: string,
	title: string,
	description: string,
	href?: string
}> = ({img, title, description, href}) => {
	return (
		<Link 
			href={href}
			style={{ textDecoration: 'none' }}
			p={[3, 3, 5]}
			borderRadius='xl'
			_hover={{
				textColor: '#8247e5',
				transition: '0.5s'
			}}
		>
			<VStack>
				<Avatar
					src={img}
					size='xl'
				/>
				<Text colorScheme='red' fontSize='2xl'>{title}</Text>
				<Text fontSize='1xl'>{description}</Text>
			</VStack>
		</Link>
	);
}
