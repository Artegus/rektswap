import { FC } from 'react';

import { 
	Center, VStack,
	Heading, SimpleGrid,
	Link, Button, HStack,
	Text
} from '@chakra-ui/react';

import { TelegramIcon } from '../../icons/TelegramIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { 
	batcherEtherscan,
	rektEtherscan,
	ownershipRenouncedTx,
	liqLockedTx
} from '../AboutRekt/AboutRekt';

export const HomeLinks: FC = () => {
	return (
		<Center>
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
						w='100%'
						aria-label='Twitter account' 
						leftIcon={<TwitterIcon />}
						variant='outline'
					>Twitter</Button>
				</Link>
				<Link w='100%' href='https://t.me/rektswap_community' m={2}>
					<Button
						w='100%'
						aria-label='Telegram group' 
						leftIcon={<TelegramIcon />}
						variant='outline'
					>Telegram group</Button>
				</Link>
				<Link w='100%' href={liqLockedTx} m={2}>
					<Button
						w='100%'
						aria-label='Liq lock' 
						leftIcon={<ExternalLinkIcon />}
						variant='outline'
					>Liquidity locked</Button>
				</Link>
				<Link w='100%' href={ownershipRenouncedTx} m={2}>
					<Button
						w='100%'
						aria-label='ERC20 Ownership' 
						leftIcon={<ExternalLinkIcon />}
						variant='outline'
					>Ownership renounced</Button>
				</Link>
				<HStack w='100%' m={2}>
					<Link w='100%' href={batcherEtherscan} >
						<Button
							w='100%'
							aria-label='DEX' 
							leftIcon={<ExternalLinkIcon />}
							variant='outline'
						>DEX</Button>
					</Link>
					<Link w='100%' href={rektEtherscan} >
						<Button
							w='100%'
							aria-label='ERC20' 
							leftIcon={<ExternalLinkIcon />}
							variant='outline'
						>ERC20</Button>
					</Link>
				</HStack>
			</VStack>
		</Center>
	);
}
