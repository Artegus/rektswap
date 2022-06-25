import { HStack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FormatUtils } from '../../../utils/FormatUtils';
import { ACTION_TABS } from '../responsive/breakpoints';

type Props = {
    tabTitle: string;
    tokenName: string;
    balance: string;
}

export const HeaderTabSwap: FC<Props> = ({
    tabTitle,
    tokenName,
    balance
}) => {
    return (
        <HStack
            p={ACTION_TABS.HStackGeneralPadding}
            w="full"
            justifyContent="space-between"
        >
            <Text fontWeight='bold' size="md" fontSize={ACTION_TABS.HeadingFontSize} >
                {tabTitle}
            </Text>
            <Text fontSize={ACTION_TABS.BoxFontSize} >
                {balance === '' ? '' : `${tokenName} balance: ${FormatUtils.formatEth(balance)}`}
            </Text>
        </HStack>
    )
}
