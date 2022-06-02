import { FC, useState, useEffect } from 'react';

import { providers, utils, EventFilter } from 'ethers';
import { formatEth } from '../Swap/BuyRektTab';
import { formatRekt } from '../Swap/SellRektTab';
import { useRektTxsBatcherContract } from "../../hooks/useContract";

import {
	Badge, Text, Spinner, HStack, Box
} from '@chakra-ui/react';

import {
	CheckCircleIcon	
} from '@chakra-ui/icons'

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
const batcherAddr = defaultContracts.REKT_TRANSACTION_BATCHER.address;
const fulfillerAddr = defaultContracts.RANDOMNESS_FULFILLER.address;

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
	// @ts-ignore
	/* TODO use the etherscan API or something to see internal transactions
	const txHash = sellsEvents[0].transactionHash;
	const fulfillTx = await userProv.getTransaction(txHash);
	console.log(txHash);
	console.log(fulfillTx);
	*/
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
	console.log(sale);
	const percent = formatPercent(getBurnedAmountPercent(sale));
	console.log(percent);
	return(
		<HStack>
			<Box>
			You sold <Badge>
				{formatRekt(parseFloat(quantitySold))} REKT
			</Badge> for an {percent}%
			</Box>
			<CheckCircleIcon />
		</HStack>
	);
}

export const RektSaleFormat: FC<{tx: TransactionReceipt}> = ({tx}) => {
    const [sale, setSale] = useState<Event | null>(null);
	const batcher = useRektTxsBatcherContract();
	useEffect(() => {
		getBatcherSaleIfFulfilled(tx, batcher).then(
			res => {setSale(res);}
		)
	}, []);
	if(sale === null)
		return <ProcessingByBatcher tx={tx} />
	else return <SaleCompleted tx={tx} sale={sale} />
}
