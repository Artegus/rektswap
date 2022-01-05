import { FC } from 'react';
import {
    Box
} from '@chakra-ui/react'
import { LogoIcon } from '../../icons/logo'

export const Logo: FC = () => {
    return (
        <Box px='5'>
            <LogoIcon
                w={8} 
                h={8}
                style={{
                    fill: '#8247E5',
                }}
            />
        </Box>
    )
}
