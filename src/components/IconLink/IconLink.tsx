import { FC } from 'react'
import { IconProps, Link, useColorModeValue } from '@chakra-ui/react'

type IconLinkProps = {
    IconComponent: FC<IconProps>;
    href: string;
    isExternal: boolean
    iconWidthSize?: string;
    colorMode?: {
        white: string;
        black: string;
    };
}

export const IconLink: FC<IconLinkProps> = ({
    IconComponent,
    href,
    isExternal,
    iconWidthSize = '20px',
    colorMode = {
        white: 'blackAlpha.700',
        black: 'whiteAlpha.900'
    }
}) => {
    const { white, black } = colorMode;
    const color = useColorModeValue(white, black);

    return (
        <Link href={href} isExternal={isExternal} color={color} >
            <IconComponent w={iconWidthSize} />
        </Link>
    )
}