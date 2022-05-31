import { FC } from "react";
import { useSwapStore } from "../../stores/SwapStore";
import { providers, utils } from "ethers";
import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { formatEth } from "../Swap/BuyRektTab";
import { formatRekt } from "../Swap/SellRektTab";

import {
	Badge, Text
} from "@chakra-ui/react";

export const isTransactionReceipt = (tx: any): boolean => (tx.tx !== undefined);

export const isBuyOrder = (tx: any) => 
	tx.tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;	

type PendingTx = {
	buy: number; forAmount: number
}

type TransactionReceipt = providers.TransactionReceipt;
type ThisTx = TransactionReceipt | PendingTx;

export const HistoryCard: FC<{tx: ThisTx}> = tx => { 
	console.log(tx);
	console.log(typeof tx);
	
	const BuyText: FC<{tx: TransactionReceipt}> = tx => {
		const quantitySold = utils.formatUnits(tx.tx.logs[1].data);
		const quantityReceived = utils.formatUnits(tx.tx.logs[2].data);
		return (
			<>
			Buy <Badge>
				{formatRekt(parseFloat(quantityReceived))} REKT
			</Badge> for <Badge>
				{formatEth(parseFloat(quantitySold))} ETH
			</Badge>
			</>
		)
	};
	const SellText: FC<{tx: TransactionReceipt}> = tx => {
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
	};
	
	const GetFormatedTextBasedOn: FC<{tx: ThisTx}> = tx => {
		if(isTransactionReceipt(tx))
			return isBuyOrder(tx) ? 
				<BuyText tx={tx} /> :
				<SellText tx={tx} />;
		else return null;
	};

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

