import { FC } from "react";
import { ACTION_TABS } from "./responsive/breakpoints";
import { Props } from "../../types/TxDataProps/TxDataProps";
import { useSwapStore } from "../../stores/SwapStore";

import {
	Box, Badge, Text
} from "@chakra-ui/react";

export const HistoryCard: FC<Props> = ({ quantitySold, quantityReceived }) => { 

	const { lastTx, currentTab } = useSwapStore();
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
			borderRadius='md'
			borderWidth='1px'
			w={ACTION_TABS.HistoryCardWidth}
			fontSize='1xl'
			px={4}
			py={2}
		>
			{currentTab === "Buy"? <BuyText /> : <SellText />}
		</Text> 
	);
}

