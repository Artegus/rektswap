import { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { ConnectorNames } from '../../connectors';
import { useConnectWallet } from '../../hooks/useConnectWallet';

export const ConnectWallet: FC<ButtonProps> = ({
    w,
    size
}) => {

    const connectWallet = useConnectWallet();

    return (
        <Button 
            size={size}
            w={w}
            onClick={() => {
                connectWallet(ConnectorNames.Injected);
            }}
        >
            Connect wallet
        </Button>
    )
}
