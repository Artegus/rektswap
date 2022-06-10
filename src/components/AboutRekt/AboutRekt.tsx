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

const batcherEtherscan = 
	`https://polygonscan.com/address/${REKT_TX_BATCHER}`;
const rektEtherscan = 
	`https://polygonscan.com/address/${REKTCOIN}`;
const ownershipRenouncedTx = 
	'https://polygonscan.com/tx/0x4c3b72620a65b06b965a73cbf5decef04af24aedef16a56516f766981e566389';
const liqLockedTx = 
	'https://cryptexlock.me/pair/137/0xd7EC5C3569aCc64a705968bBDe6D2bdcE784B2B0';

// TODO NOTE FIXME all those links should be updated in production

export const AboutRekt: FC<Props> = ({
	isOpen, onOpen, onClose
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered >
			<ModalOverlay />
			<ModalContent>
			  	<ModalHeader>About REKTcoin</ModalHeader>
			  	<ModalCloseButton />
			  	<ModalBody pb={6}>
					<VStack>
						<Text>
							REKTcoin (REKT) is an hyperdeflationary ERC20
							experimental shitcoin on the MATIC blockchain. You
							can buy REKT without any fees, but every time you
							sell any REKT an completely random amount gets
							burned. Gamble with caution.
						</Text>
						<Text>
							If you like the coin we might do an proper 
							whitepaper in the future explaining the
							protocol.
						</Text>
						<Divider pt={3}/>
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
