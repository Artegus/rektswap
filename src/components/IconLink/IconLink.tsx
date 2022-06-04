import { FC } from 'react'
import { IconProps, Link } from '@chakra-ui/react'

type IconLinkProps = {
    IconComponent: FC<IconProps>;
    href: string;
    isExternal: boolean
    color?: string;
}

export const IconLink: FC<IconLinkProps> = ({
    IconComponent,
    href,
    isExternal,
    color = 'whiteAlpha.800',
}) => {

    return (
        <Link href={href} isExternal={isExternal} color={color}>
            <IconComponent />
        </Link>
    )
}