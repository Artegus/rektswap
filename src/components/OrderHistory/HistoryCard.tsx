import { FC } from 'react';
import { useSwapStore } from '../../stores/SwapStore';
import { providers, utils } from 'ethers';
import { defaultContracts } from '../../config/constants/tokenLists/default.contracts';
import { formatEth } from '../Swap/BuyRektTab';
import { formatRekt } from '../Swap/SellRektTab';
import { RektSaleFormat } from './RektSaleFormat';

import {
	Badge, Text, Spinner, HStack, Box
} from '@chakra-ui/react';
import {
	CheckCircleIcon	
} from '@chakra-ui/icons'

export const isBuyOrder = (tx: TransactionReceipt) =>
	tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;

type TransactionReceipt = providers.TransactionReceipt;

const BuyText: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = utils.formatUnits(tx.logs[1].data);
	const quantityReceived = utils.formatUnits(tx.logs[2].data);
	return (
		<HStack>
			<Box w='100%'>
				Buy <Badge>
					{formatRekt(parseFloat(quantityReceived))} REKT
				</Badge> for <Badge>
					{formatEth(parseFloat(quantitySold))} ETH
				</Badge>
			</Box>
			<CheckCircleIcon />
		</HStack>
	)
}

const GetFormatedTextBasedOn: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const txRec = tx as TransactionReceipt;
		return isBuyOrder(txRec) ? 
			<BuyText tx={txRec} /> :
			<RektSaleFormat tx={txRec} />;
}

export const HistoryCard: FC<{tx: TransactionReceipt}> = ({tx}) => { 
	return (
		<Text
			fontSize='1xl'
			px={4}
			py={2}
			textAlign='left'
			w='100%'
		>
			<GetFormatedTextBasedOn tx={tx} />
		</Text> 
	);
}

