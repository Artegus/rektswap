import { FC, useState, useEffect } from 'react';

import { providers, utils, EventFilter } from 'ethers';
import { useRektTxsBatcherContract } from '../../hooks/useContract';
import { DateBadgeFor } from './HistoryCard';
import { CheckCircleIcon } from '@chakra-ui/icons'
import {
	Badge, Spinner, HStack, 
	Box, Center, VStack
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { FormatUtils } from '../../utils/FormatUtils';


type TransactionReceipt = providers.TransactionReceipt;

const ProcessingByBatcher: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = utils.formatUnits(tx.logs[0].data);
	return (
		<HStack>
			<Box>
			Your <Badge>
				{FormatUtils.formatRekt(quantitySold)} REKT
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
						{FormatUtils.formatRekt(quantitySold)} REKT
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

	const { library } = useWeb3React<Web3Provider>();

	const getBatcherSaleIfFulfilled = async (
		tx: TransactionReceipt, batcher: any
	): Promise<Event | null> => {
		const sellsFilter: EventFilter = batcher.filters.BatchCompleted();
		const blockNumber = await library!.getBlockNumber();

		const sellsEvents: Event[] = await batcher.queryFilter(
			sellsFilter, tx.blockNumber - blockNumber
		);
		if(sellsEvents.length === 0) return null;
		return sellsEvents[0];
	
	}

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
