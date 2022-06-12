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
			_hover={{
				//bgGradient:'linear(270deg, #ff3737, #8247E5)',
				bg:'#8247E555',
				borderRadius: 'xl',
				transition:'0.3s',
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
