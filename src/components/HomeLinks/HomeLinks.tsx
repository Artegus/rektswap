import { FC } from 'react';

import { 
	Center, VStack,
	Heading, SimpleGrid,
	Link, Button, HStack
} from '@chakra-ui/react';

import { TelegramIcon } from '../../icons/TelegramIcon';
import { TwitterIcon } from '../../icons/TwitterIcon';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const HomeLinks: FC = () => {
	return (

		<Center mb={10}>
			<VStack>
				<Heading
					fontSize='6xl'
					bgGradient='linear(270deg, #ff3737, #8247E5)'
					backgroundClip='text'
					fontFamily={`'Kdam Thmor Pro', sans-serif`}
				>
					LINKS
				</Heading>
					<Link m={2}>
						<Button
							aria-label='Twitter account' 
							leftIcon={<TwitterIcon />}
							variant='outline'
						>Twitter</Button>
					</Link>
					<Link m={2}>
						<Button
							aria-label='Telegram group' 
							leftIcon={<TelegramIcon />}
							variant='outline'
						>Telegram group</Button>
					</Link>
					<Link m={2}>
						<Button
							aria-label='Twitter account' 
							leftIcon={<ExternalLinkIcon />}
							variant='outline'
						>Liquidity locked</Button>
					</Link>
					<Link m={2}>
						<Button
							aria-label='Twitter account' 
							leftIcon={<ExternalLinkIcon />}
							variant='outline'
						>Ownership renounced</Button>
					</Link>
					<HStack m={2}>
						<Link>
							<Button
								aria-label='Twitter account' 
								leftIcon={<ExternalLinkIcon />}
								variant='outline'
							>DEX</Button>
						</Link>
						<Link>
							<Button
								aria-label='Twitter account' 
								leftIcon={<ExternalLinkIcon />}
								variant='outline'
							>ERC20</Button>
						</Link>
					</HStack>
			</VStack>
		</Center>
	);
}
