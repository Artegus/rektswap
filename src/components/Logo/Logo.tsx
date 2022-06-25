import { FC } from 'react';
import {
    HStack, Link
} from '@chakra-ui/react'
import { MaticIcon } from '../../icons/MaticIcon';
import { RektText } from './RektText';

const getRouteSplit = ():Array<string> => (window.location.host.split('.'));

const atHome = (): boolean => (getRouteSplit()[0] === 'www');

const inProduction = (): boolean => (getRouteSplit().length === 3);

const getHomeLink = (): string => (
	atHome() ? '/' : (
		inProduction() ? `https://${getRouteSplit()[1]}.net` : '/'
	)
);

export const Logo: FC = () => {
    return (
		<Link href={getHomeLink()} style={{ textDecoration: 'none' }}>
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
