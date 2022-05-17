import { FC } from "react";
import { ACTION_TABS } from "./responsive/breakpoints";
import { Props } from "../../types/TxDataProps/TxDataProps";

import {
	Box, Badge, Text
} from "@chakra-ui/react";

export const HistoryCard: FC<Props> = ({ quantitySold }) => { 
	console.log(quantitySold);
	return (
		<Text
			borderRadius='md'
			borderWidth='1px'
			w={ACTION_TABS.HistoryCardWidth}
			fontSize='1xl'
			px={4}
			py={2}
		>
			Sell <Badge>{quantitySold} REKT</Badge> for <Badge>n ETH</Badge>
		</Text> 
	);
}

