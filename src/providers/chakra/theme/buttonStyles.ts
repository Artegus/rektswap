import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { ComponentStyleConfig } from '@chakra-ui/react'

export const buttonStyles: ComponentStyleConfig = {
    variants: {
        'simple-button' : (props: StyleFunctionProps) => ({
            bg: mode('#F3EDFC', 'whiteAlpha.200')(props)
        }),
    },
}
