import { FC } from "react";
import { useSwapStore } from "../../stores/SwapStore";
import { providers, utils } from "ethers";
import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { formatEth } from "../Swap/BuyRektTab";
import { formatRekt } from "../Swap/SellRektTab";

import {
	Badge, Text, Spinner
} from "@chakra-ui/react";

export const isBuyOrder = (tx: TransactionReceipt) =>
	tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;

type TransactionReceipt = providers.TransactionReceipt;
type PendingTx = {
	buy: number; forAmount: number
};
type HistoryCardProps = TransactionReceipt | PendingTx;

export const isTransactionReceipt = (tx: HistoryCardProps): boolean =>
	(tx as TransactionReceipt).transactionHash !== undefined; 

const BuyText: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = utils.formatUnits(tx.logs[1].data);
	const quantityReceived = utils.formatUnits(tx.logs[2].data);
	return (
		<>
		Buy <Badge>
			{formatRekt(parseFloat(quantityReceived))} REKT
		</Badge> for <Badge>
			{formatEth(parseFloat(quantitySold))} ETH
		</Badge>
		</>
	)
}

const SellText: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const quantitySold = '0';// TODO utils.formatUnits(tx.tx.logs[0].data);
	const quantityReceived = '0'; // TODO implement @DennisDv24 crazy algorithm
	return (
		<>
		Sell <Badge>
			{formatRekt(parseFloat(quantitySold))} REKT
		</Badge> for <Badge>
			{formatEth(parseFloat(quantityReceived))} ETH
		</Badge>
		</>
	)
}

const FormatedPendingOrder: FC<{tx: PendingTx}> = ({tx}) => {
	return (
		<>
		Buying <Badge>
			{formatRekt(tx.forAmount)} REKT
		</Badge> for <Badge>
			{formatEth(tx.buy)} ETH
		</Badge>
		<Spinner />
		</>
	)
}

const GetFormatedTextBasedOn: FC<{tx: HistoryCardProps}> = ({tx}) => {
	if(isTransactionReceipt(tx)) {
		const txRec = tx as TransactionReceipt;
		return isBuyOrder(txRec) ? 
			<BuyText tx={txRec} /> :
			<SellText tx={txRec} />;
	}
	else return <FormatedPendingOrder tx={tx as PendingTx} />;
}

export const HistoryCard: FC<{tx: HistoryCardProps}> = ({tx}) => { 
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

