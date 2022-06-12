import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

export const buttonStyles = {
    baseStyle: (props: StyleFunctionProps) => ({
        bg: mode('brandLightAlpha.300', 'whiteAlpha.200')(props)
    }),
    defaultProps: {
        size: 'md', // default is md
        variant: 'sm', // default is solid
    },
}