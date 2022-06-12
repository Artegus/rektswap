import { FC } from 'react';

import { 
	Heading, Center, List,
	ListIcon, ListItem, Text, 
	VStack
} from '@chakra-ui/layout';

import { 
	CheckCircleIcon as
	MdCheckCircle,
	SettingsIcon as MdSettings
} from '@chakra-ui/icons';

import { BsCircle } from 'react-icons/bs';

const red = '#ff3737';
const purple = '#8247E5';

export const Roadmap: FC = () => {
	return (
		<VStack
			pb={20}
		>
				<Center p={10}>
				<Heading size='3xl'>
					<Text
						bgGradient='linear(90deg, #C13F8E, #8247E5)'
						backgroundClip='text'
						fontFamily={`'Kdam Thmor Pro', sans-serif`}
					>
						ROADMAP
					</Text>
				</Heading>
			</Center>
			<List spacing={3} fontSize='2xl'>
				<ListItem>
					<ListIcon as={MdCheckCircle} color={purple} />
					Launch Contracts
				</ListItem>
				<ListItem>
					<ListIcon as={MdCheckCircle} color={purple} />
					Launch the Dapp
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					50 Telegram members and airdrop
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					Community DAO organization
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					200 Telegram members
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					Coinmarketcap listing
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					REKT NFTs with reflections
				</ListItem>
				<ListItem>
					<ListIcon as={BsCircle} color={red} />
					Ecosystem expansion
				</ListItem>
			</List>
		</VStack>
	);
}
