import { FC } from 'react'
import { Props } from '../../types/ModalProps/ModalProps';

import {
	Modal, ModalOverlay, 
	ModalContent,
	ModalHeader, ModalCloseButton, ModalBody,
	Text, VStack, Divider, Box, Link, HStack,
} from '@chakra-ui/react';

import {
	ExternalLinkIcon
} from '@chakra-ui/icons'

const batcherEtherscan = 
	'https://kovan.etherscan.io/address/0x4b170fa8934740a3a753e2c7cfd2dd1d973fac93';
const rektEtherscan = 
	'https://kovan.etherscan.io/token/0x33632e8362e9084f36ab68bf59269f54bde787ae';
const ownershipRenouncedTx = batcherEtherscan;
const liqLockedTx = rektEtherscan;

// TODO NOTE FIXME all those links should be updated in production

export const AboutRekt: FC<Props> = ({
	isOpen, onOpen, onClose
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} >
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
							sell any REKT an completly random amount gets
							burned. Gamble with caution.
						</Text>
						<Text>
							If you like the coin we might do an poper
							whitepaper in the future explaining the
							protocol.
						</Text>
						<Divider pt={3}/>
						<HStack>
							<Link href={batcherEtherscan} isExternal>
								DEX contract <ExternalLinkIcon mx='2px' />
							</Link>
							<Link href={rektEtherscan} isExternal>
								ERC20 contract <ExternalLinkIcon mx='2px' />
							</Link>
						</HStack>
						<HStack>
							<Link href={ownershipRenouncedTx} isExternal>
								Ownership renounced<ExternalLinkIcon mx='2px' />
							</Link>
							<Link href={liqLockedTx} isExternal>
								Liquidity locked<ExternalLinkIcon mx='2px' />
							</Link>
						</HStack>
					</VStack>
			  	</ModalBody>
			</ModalContent>
		</Modal>
	);
			
}
