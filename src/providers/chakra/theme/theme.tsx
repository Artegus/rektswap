import { extendTheme, theme as base } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { buttonStyles } from './buttonStyles'

export const theme = extendTheme({
    colors: {
        brandLight: {
            50: '#e6e2da',
            100: '#e6decf',
            200: '#e6d7b8',
            300: '#e6d0a1',
            400: '#e6c88a',
            500: '#e6c173',
            600: '#e6ba5c',
            700: '#e6b345',
            800: '#e6ab2e',
            900: '#e6a417',
            1000: '#e69d00',
        },
        brandLightAlpha: {
            200: 'rgb(230, 157, 0, 0.08)',
            300: 'rgb(230, 157, 0, 0.16)',
        },

    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('linear-gradient(#F8ECD3, #EEFEFE)', 'linear-gradient(#07132C, #110101)')(props),
            },
        }),
    },
    components: {
        Button: { ...buttonStyles },
    }
})