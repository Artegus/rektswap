import { FC } from 'react';
import {
    HStack, Text
} from '@chakra-ui/react'
import { MaticIcon } from '../../icons/MaticIcon'

export const Logo: FC = () => {
    return (
        <HStack>
            <MaticIcon
                w={8} 
                h={8}
                color="#8247E5"
            />
            <Text
                bgGradient='linear(270deg, #ff3737, #8247E5)'
                backgroundClip='text'
                fontSize='xl'
                fontFamily={`'Kdam Thmor Pro', sans-serif`}
            >REKT</Text>
        </HStack>
    )
}
