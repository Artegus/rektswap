import { FC } from 'react';
import {
    HStack
} from '@chakra-ui/react'
import { MaticIcon } from '../../icons/MaticIcon';
import { RektText } from './RektText';

export const Logo: FC = () => {
    return (
        <HStack>
            <MaticIcon
                w={8} 
                h={8}
                color="#8247E5"
            />
			<RektText />
        </HStack>
    )
}
