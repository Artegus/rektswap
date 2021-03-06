import { FC } from 'react'
import { Props } from '../../types/ModalProps/ModalProps';

import {
	Modal, ModalOverlay, 
	ModalContent,
	ModalHeader, ModalCloseButton, ModalBody,
	Text, VStack, Divider, Box, Link, HStack,
	Wrap, WrapItem
} from '@chakra-ui/react';

import { 
	REKT_TX_BATCHER, REKTCOIN
} from "../../config/constants/tokenLists/default.contracts";

import {
	ExternalLinkIcon
} from '@chakra-ui/icons'

export const batcherEtherscan = 
	`https://polygonscan.com/address/${REKT_TX_BATCHER}`;
export const rektEtherscan = 
	`https://polygonscan.com/address/${REKTCOIN}`;
export const ownershipRenouncedTx = 
	'https://polygonscan.com/tx/0x4c3b72620a65b06b965a73cbf5decef04af24aedef16a56516f766981e566389';
export const liqLockedTx = 
	'https://cryptexlock.me/pair/137/0xd7EC5C3569aCc64a705968bBDe6D2bdcE784B2B0';


export const AboutRekt: FC<Props> = ({
	isOpen, onOpen, onClose
}) => {
	
	const faqLink = `https://${window.location.host.split('.')[1]}.net/#faq`;

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered >
			<ModalOverlay />
			<ModalContent>
			  	<ModalHeader>About REKTcoin</ModalHeader>
			  	<ModalCloseButton />
			  	<ModalBody pb={6}>
					<VStack>
						<Text>
							REKTcoin (REKT) is a hyper-deflationary ERC20 experimental shitcoin
							on the MATIC blockchain. Although buying REKT does not incur any
							fees, every time you sell REKT a completely random amount gets
							burned. This is accomplished thanks to the use of <Link 
								color='#8257E5'
								href='https://docs.chain.link/docs/chainlink-vrf/v1/'
							>
								Chainlink Oracles 
							</Link> random number generators.
						</Text>
						<Text>
							If you like the coin we might do an proper 
							whitepaper in the future explaining the
							protocol.
						</Text>
						<Text py={3}>
							Need more info? Check out the <Link color='#8247E5' href={faqLink}>
								FAQ
							</Link>
						</Text>
						<Divider/>
						<Wrap justify='center'>
							<WrapItem>
								<Link href={batcherEtherscan} isExternal>
									DEX contract <ExternalLinkIcon mx='2px' />
								</Link>
							</WrapItem>
							<WrapItem>
								<Link href={rektEtherscan} isExternal>
									ERC20 contract <ExternalLinkIcon mx='2px' />
								</Link>
							</WrapItem>
							<WrapItem>
								<Link href={ownershipRenouncedTx} isExternal>
									Ownership renounced<ExternalLinkIcon mx='2px' />
								</Link>
							</WrapItem>
							<WrapItem>
								<Link href={liqLockedTx} isExternal>
									Liquidity locked<ExternalLinkIcon mx='2px' />
								</Link>
							</WrapItem>
						</Wrap>
					</VStack>
			  	</ModalBody>
			</ModalContent>
		</Modal>
	);
			
}
