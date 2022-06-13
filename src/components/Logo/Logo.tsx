import { FC } from 'react';
import {
    HStack, Link
} from '@chakra-ui/react'
import { MaticIcon } from '../../icons/MaticIcon';
import { RektText } from './RektText';

export const Logo: FC = () => {
	
	const split = window.location.host.split('.');
	const homeLink = split.length === 1 ? `http://${split[0]}` : `http://${split[1]}`;

    return (
		<Link href={homeLink} style={{ textDecoration: 'none' }}>
        <HStack>
            <MaticIcon
                w={8} 
                h={8}
                color="#8247E5"
            />
			<RektText asHeading otherProps={{size: 'lg'}}/>
        </HStack>
		</Link>
    )
}
