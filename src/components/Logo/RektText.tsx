import { FC } from 'react';
import {
    Text, Heading, TextProps
} from '@chakra-ui/react';

export const RektText: FC<{
	asHeading?: boolean,
	otherProps?: TextProps
}> = ({asHeading = false, otherProps}) => {
	if(asHeading) return (
		<Heading
			bgGradient='linear(270deg, #ff3737, #8247E5)'
			backgroundClip='text'
			fontFamily={`'Kdam Thmor Pro', sans-serif`}
			{...otherProps}
		>REKT</Heading>
	);
	else return (
		<Text
			bgGradient='linear(270deg, #ff3737, #8247E5)'
			backgroundClip='text'
			fontFamily={`'Kdam Thmor Pro', sans-serif`}
			{...otherProps}
		>REKT</Text>
	);

}
