import { FC } from 'react';
import {
    Box
} from '@chakra-ui/react'
import { LogoIcon } from '../../icons/LogoIcon'

export const Logo: FC = () => {
    return (
        <Box >
            <LogoIcon
                w={8} 
                h={8}
                color="#8247E5"
            />
        </Box>
    )
}
