import { Button, HStack } from '@chakra-ui/react';
import { FC } from 'react'
import { ConnectWallet } from '../../ConnectWallet/ConnectWallet';
import { ACTION_TABS } from '../responsive/breakpoints';

type Props = {
    active: boolean;
    actionTab: {
        text: string;
        handleOnClick: () => Promise<void>
    };
}

export const ActionSwap: FC<Props> = ({
    active,
    actionTab
}) => {

    return (
        <HStack px={ACTION_TABS.HStackLeftRightPadding} paddingTop={2} paddingBottom={5} >
            {!active ?
                <ConnectWallet
                    size="md"
                    w="full"
                /> :
                <Button
                    size="md"
                    w="full"
                    onClick={actionTab.handleOnClick}
                    variant='simple-button'
                >
                    {actionTab.text}
                </Button>
            }
        </HStack>
    )
}
