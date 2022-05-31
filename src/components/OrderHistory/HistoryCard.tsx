import { FC } from "react";
import { useSwapStore } from "../../stores/SwapStore";
import { providers, utils } from "ethers";

import {
	Badge, Text
} from "@chakra-ui/react";

export const HistoryCard: FC<{tx: providers.TransactionReceipt}> = tx => { 

	const { currentTab } = useSwapStore();
	
	console.log(tx);
	// TODO it should be something like
	// quantitySold= txIsRektsell(tx)? specificFormatX : specificFormatY;
	const quantitySold = utils.formatUnits(tx.tx.logs[1].data);
	const quantityReceived = utils.formatUnits(tx.tx.logs[2].data);

	const BuyText: FC = () => (
		<>
		Buy <Badge>
			{quantityReceived} REKT
		</Badge> for <Badge>
			{quantitySold} ETH
		</Badge>
		</>
	);
	const SellText: FC = () => (
		<>
		Sell <Badge>
			{quantitySold} REKT
		</Badge> for <Badge>
			{quantityReceived} ETH
		</Badge>
		</>
	);
	

	return (
		<Text
			fontSize='1xl'
			px={4}
			py={2}
			textAlign='left'
			w='100%'
		>
			{currentTab === "Buy"? <BuyText /> : <SellText />}
		</Text> 
	);
}

