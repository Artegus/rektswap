import { extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('linear-gradient(#F8ECD3, #EEFEFE)', 'linear-gradient(#07132C, #110101)')(props),
            },
        }),
    },
})