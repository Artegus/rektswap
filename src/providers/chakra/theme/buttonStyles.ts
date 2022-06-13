import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { ComponentStyleConfig } from '@chakra-ui/react'

export const buttonStyles: ComponentStyleConfig = {
    variants: {
        'simple-button' : (props: StyleFunctionProps) => ({
            bg: mode('#F3EDFC', '#1a263c')(props),
			_hover: {
				bgColor: mode('#e6dafa', '#2f374b')(props)
			}
        }),
        'darker-button' : (props: StyleFunctionProps) => ({
            bg: mode('#F3EDFC', '#000')(props),
			_hover: {
				bgColor: mode('#e6dafa', '#2f374b')(props)
			}
        }),
    },
}
