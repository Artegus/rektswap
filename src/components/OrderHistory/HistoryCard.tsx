import { FC, useState, useEffect } from 'react';
import { useSwapStore } from '../../stores/SwapStore';
import { providers, utils } from 'ethers';
import { defaultContracts } from '../../config/constants/tokenLists/default.contracts';
import { RektSaleFormat } from './RektSaleFormat';

import {
	Badge, Text, Spinner, HStack, Box, VStack
} from '@chakra-ui/react';
import {
	CheckCircleIcon	
} from '@chakra-ui/icons'
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { FormatUtils } from '../../utils/FormatUtils';

export const isBuyOrder = (tx: TransactionReceipt) =>
	tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;

type TransactionReceipt = providers.TransactionReceipt;


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
	
	const { library } = useWeb3React<Web3Provider>();

	const getTxDate = async (tx: TransactionReceipt): Promise<Date> => {
		const block = await library!.getBlock(tx.blockNumber);
		
		return new Date(
			1000 * block.timestamp
		);
	}
	
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
						{FormatUtils.formatRekt(quantityReceived)} REKT
					</Badge> for <Badge>
						{FormatUtils.formatEth(quantitySold)} MATIC 
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

