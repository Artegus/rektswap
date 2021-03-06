import { FC, useState, useEffect } from 'react';

import { providers, utils, EventFilter } from 'ethers';
import { formatEth } from '../Swap/BuyRektTab';
import { formatRekt } from '../Swap/SellRektTab';
import { useRektTxsBatcherContract } from '../../hooks/useContract';
import { DateBadgeFor } from './HistoryCard';

import {
	Badge, Text, Spinner, HStack, Box, Center,
	Flex, VStack
} from '@chakra-ui/react';

import {
	CheckCircleIcon	
} from '@chakra-ui/icons'

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
const batcherAddr = defaultContracts.REKT_TRANSACTION_BATCHER.address;

type TransactionReceipt = providers.TransactionReceipt;

const getBatcherSaleIfFulfilled = async (
	tx: TransactionReceipt, batcher: any
): Promise<Event | null> => {
	const userProv = new providers.Web3Provider(window.ethereum);
	const sellsFilter: EventFilter = batcher.filters.BatchCompleted();
	const sellsEvents: Event[] = await batcher.queryFilter(
		sellsFilter, tx.blockNumber - await userProv.getBlockNumber()
	);
	if(sellsEvents.length === 0) return null;
	return sellsEvents[0];

}

const ProcessingByBatcher: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = utils.formatUnits(tx.logs[0].data);
	return (
		<HStack>
			<Box>
			Your <Badge>
				{formatRekt(parseFloat(quantitySold))} REKT
			</Badge> sale is being proccesed by the batcher
			</Box>
			<Spinner />
		</HStack>
	);
}

export const getBurnedAmountPercent = (sale: Event): number => // @ts-ignore
	100 - (100*(sale.args.totalBurnedAmount / sale.args.initialBatchAmount));

export const formatPercent = (percent: number) => Math.round(percent);

const SaleCompleted: FC<{
	tx: TransactionReceipt, sale: Event 
}> = ({tx, sale}) => {
	const quantitySold = utils.formatUnits(tx.logs[0].data);
	const percent = formatPercent(getBurnedAmountPercent(sale));
	return(
		<HStack>
			<VStack w='100%' align='left'>
				<Box>
					You sold <Badge>
						{formatRekt(parseFloat(quantitySold))} REKT
					</Badge> for an <Badge>{percent}%</Badge>
				</Box>
				<DateBadgeFor tx={tx} />
			</VStack>
			<CheckCircleIcon />
		</HStack>
	);
}

export const RektSaleFormat: FC<{tx: TransactionReceipt}> = ({tx}) => {
    const [sale, setSale] = useState<Event | null>(null);
	const [loadingHistory, setLoadingHistory] = useState<boolean>(true);
	const batcher = useRektTxsBatcherContract();
	
	const updateSale = () => {
		getBatcherSaleIfFulfilled(tx, batcher).then(res => {
			setSale(res);
			setLoadingHistory(false);
		});
	}

	const updateSaleAndLoad = () => {
		setLoadingHistory(true);
		updateSale();
	}
	
	useEffect(() => {
		updateSaleAndLoad();
		const interval = setInterval(() => {
			updateSale();
		}, 1000);
		return () => clearInterval(interval);
	}, []);


	if(loadingHistory) return <Center><Spinner/></Center>
	if(sale === null)
		return <ProcessingByBatcher tx={tx} />
	else return <SaleCompleted tx={tx} sale={sale} />
}
