import { FC, useState, useEffect } from 'react';
import { providers, utils } from 'ethers';
import { defaultContracts } from '../../config/constants/tokenLists/default.contracts';
import { formatEth } from '../Swap/BuyRektTab';
import { formatRekt } from '../Swap/SellRektTab';
import { RektSaleFormat } from './RektSaleFormat';

import {
	Badge, Text, Spinner, HStack, Box, VStack
} from '@chakra-ui/react';
import {
	CheckCircleIcon	
} from '@chakra-ui/icons'

export const isBuyOrder = (tx: TransactionReceipt) =>
	tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;

type TransactionReceipt = providers.TransactionReceipt;

export const getTxDate = async (tx: TransactionReceipt): Promise<Date> => {
	const userProv = new providers.Web3Provider(window.ethereum);
	return new Date(
		1000 * (await userProv.getBlock(tx.blockNumber)).timestamp
	);
}

const getFormatedDate = (d: Date): string => {
	const mdy = d.toLocaleDateString('en-US');
	const hoursString = d.getHours().toString();
	const hoursFormat = hoursString.length === 1 ? '0' + hoursString : hoursString;
	const minsString = d.getMinutes().toString();
	const minsFormat = minsString.length === 1 ? '0' + minsString : minsString;
	return `${mdy} ${hoursFormat}:${minsFormat}`;
}

export const DateBadgeFor: FC<{tx: TransactionReceipt}> = ({tx}) => {
    const [txDate, setTxDate] = useState<Date | null>(null);
	useEffect(() => {
		const updateDate = async () => {
			getTxDate(tx).then(res => setTxDate(res))
		}
		updateDate();
	}, []);
	if(txDate === null) return (<Box>At <Spinner ml={1} size='xs' /></Box>);
	return (
		<Box>
			At <Badge>
				{txDate !== null ? getFormatedDate(txDate) : null}
			</Badge>
		</Box>
	)
}

const BuyText: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = utils.formatUnits(tx.logs[2].data);
	const quantityReceived = utils.formatUnits(tx.logs[4].data);
	return (
		<HStack>
			<VStack w='100%' align='left'>
				<Box>
					You bought <Badge>
						{formatRekt(parseFloat(quantityReceived))} REKT
					</Badge> for <Badge>
						{formatEth(parseFloat(quantitySold))} MATIC 
					</Badge>
				</Box>
				<DateBadgeFor tx={tx} />
			</VStack>
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

