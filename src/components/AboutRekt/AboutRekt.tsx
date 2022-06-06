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
	'https://polygonscan.com/address/0x686ec0d335b843ce76efb1a5ea458169aa2f2518';
const rektEtherscan = 
	'https://polygonscan.com/address/0x6810eB4C954eE77E4fe5d4Af59EF1AA15E25B70F';
const ownershipRenouncedTx = 
	'https://polygonscan.com/tx/0xff2df70d467ab42cb34853269fce722b6de0333bd89f8ed35d6faeed7d699f0f';
const liqLockedTx = rektEtherscan; // TODO

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
							sell any REKT an completely random amount gets
							burned. Gamble with caution.
						</Text>
						<Text>
							If you like the coin we might do an proper 
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
