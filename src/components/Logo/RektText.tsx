import { FC } from 'react';
import {
    Text, Heading
} from '@chakra-ui/react';

export const RektText: FC<{
	asHeading?: boolean,
	fontSize?: string
}> = ({asHeading = false, fontSize='xl'}) => {
	if(asHeading) return (
		<Heading
			bgGradient='linear(270deg, #ff3737, #8247E5)'
			backgroundClip='text'
			fontSize={fontSize}
			fontFamily={`'Kdam Thmor Pro', sans-serif`}
		>REKT</Heading>
	);
	else return (
		<Text
			bgGradient='linear(270deg, #ff3737, #8247E5)'
			backgroundClip='text'
			fontSize={fontSize}
			fontFamily={`'Kdam Thmor Pro', sans-serif`}
		>REKT</Text>
	);

}
