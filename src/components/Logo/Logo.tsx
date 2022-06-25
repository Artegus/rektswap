import { FC } from 'react';
import { HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MaticIcon } from '../../icons/MaticIcon';
import { RektText } from './RektText';

export const Logo: FC = () => {
    return (
        <Link to='/' >
            <HStack>
                <MaticIcon
                    w={8}
                    h={8}
                    color="#8247E5"
                />
                <RektText asHeading otherProps={{ size: 'lg' }} />
            </HStack>
        </Link>
    )
}
