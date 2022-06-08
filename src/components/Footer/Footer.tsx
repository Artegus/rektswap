import { FC } from "react"
import { HStack } from "@chakra-ui/react"

import { TelegramIcon } from "../../icons/TelegramIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { IconLink } from "../IconLink/IconLink"

const socialMediaData = [
    { href: 'https://twitter.com/REKTswap', component: TwitterIcon },
    { href: 'https://t.me/rektswap_community', component: TelegramIcon }

]

export const Footer: FC = () => {

    return (
        <HStack
            w="full"
            justifyContent="space-between"
        >
            <HStack spacing={5} >
                {socialMediaData.map(({ href, component }) => (
                    <IconLink 
                        href={href} 
                        IconComponent={component} 
                        key={href} 
                        isExternal 
                    />
                ))}
            </HStack>
        </HStack>

    )
}
