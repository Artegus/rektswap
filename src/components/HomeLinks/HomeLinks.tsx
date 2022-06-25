import { FC } from 'react';

import { 
	Center, VStack,
	Heading, Link, Button, useColorMode, 
	Popover, PopoverContent, 
	PopoverTrigger, PopoverArrow,
	PopoverBody, PopoverCloseButton,
} from '@chakra-ui/react';

import { TelegramIcon } from '../../icons/TelegramIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { FaFileContract } from 'react-icons/fa';
import { BsFillBarChartFill } from 'react-icons/bs'
import { 
	batcherEtherscan,
	rektEtherscan,
	ownershipRenouncedTx,
	liqLockedTx,
} from '../AboutRekt/AboutRekt';
import { chartLink } from '../Header/MoreOptions';


export const HomeLinks: FC = () => {

    const { colorMode } = useColorMode();

	const linkButton = {
		variant: colorMode === 'light' ? 'simple-button' : 'outline',
		w: '100%',
		justifyContent: 'left'
	};

	const popoverStyle = {
		bgColor: colorMode === 'light' ? '#E6DAFA' : '#110101'
	};

	return (
		<Center pb={10}>
			<VStack>
				<Heading
					mb={3}
					size='3xl'
					bgGradient='linear(90deg, #ff3737, #C13F8E)'
					backgroundClip='text'
					fontFamily={`'Kdam Thmor Pro', sans-serif`}
				>
					LINKS
				</Heading>
				<Link w='100%' href='https://twitter.com/REKTswap' m={2}>
					<Button
						aria-label='Twitter account' 
						leftIcon={<TwitterIcon />}
						{...linkButton}
					>Twitter</Button>
				</Link>
				<Link w='100%' href='https://t.me/rektswap_community' m={2}>
					<Button
						aria-label='Telegram group' 
						leftIcon={<TelegramIcon />}
						{...linkButton}
					>Telegram group</Button>
				</Link>
				<Popover>
					<PopoverTrigger>
						<Button
							aria-label='Contracts' 
							leftIcon={<FaFileContract />}
							{...linkButton}
						>Contracts and TXs</Button>
					</PopoverTrigger>
					<PopoverContent w='100%' {...popoverStyle} >
						<PopoverArrow {...popoverStyle} />
    					<PopoverCloseButton />
    					<PopoverBody>
							<VStack>
								<Center>
								<Link w='100%' href={liqLockedTx} >
									Liquidity locked
								</Link>
								</Center>
								<Center>
								<Link w='100%' href={ownershipRenouncedTx} >
									Ownership renounced
								</Link>
								</Center>
								<Center>
								<Link w='100%' href={batcherEtherscan} >
									DEX
								</Link>
								</Center>
								<Center>
								<Link w='100%' href={rektEtherscan} >
									ERC20
								</Link>
								</Center>
							</VStack>
						</PopoverBody>
					</PopoverContent>
				</Popover>
				<Link w='100%' href={chartLink} m={2}>
					<Button
						aria-label='Chart' 
						leftIcon={<BsFillBarChartFill />}
						{...linkButton}
					>Chart</Button>
				</Link>
				{/*
				<Link w='100%' href={liqLockedTx} m={2}>
					<Button
						aria-label='Liq lock' 
						leftIcon={<ExternalLinkIcon />}
						{...linkButton}
					>Liquidity locked</Button>
				</Link>
				<Link w='100%' href={ownershipRenouncedTx} m={2}>
					<Button
						aria-label='ERC20 Ownership' 
						leftIcon={<ExternalLinkIcon />}
						{...linkButton}
					>Ownership renounced</Button>
				</Link>
				<HStack w='100%' m={2}>
					<Link w='100%' href={batcherEtherscan} >
						<Button
							aria-label='DEX' 
							leftIcon={<ExternalLinkIcon />}
							{...linkButton}
						>DEX</Button>
					</Link>
					<Link w='100%' href={rektEtherscan} >
						<Button
							aria-label='ERC20' 
							leftIcon={<ExternalLinkIcon />}
							{...linkButton}
						>ERC20</Button>
					</Link>
				</HStack>
				*/}
			</VStack>
		</Center>
	);
}
