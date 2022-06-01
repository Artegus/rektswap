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
	const quantitySold = utils.formatUnits(tx.logs[0].data);
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

const GetFormatedTextBasedOn: FC<{tx: TransactionReceipt}> = ({tx}) => {
	const txRec = tx as TransactionReceipt;
		return isBuyOrder(txRec) ? 
			<BuyText tx={txRec} /> :
			<SellText tx={txRec} />;
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

