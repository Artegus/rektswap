import { FC } from "react";
import { 
	Tab, TabList, TabPanel, TabPanels, Tabs,
	useColorModeValue,
	VStack, useColorMode
} from "@chakra-ui/react"
import { Props } from "../../types/TabProps/TabProps";
import { SellRektTab } from "./SellRektTab";
import { BuyRektTab } from "./BuyRektTab";
import { ACTION_TABS } from "./responsive/breakpoints";

type TabData = {
    title: string;
    content: FC<Props>;
}

export const ActionsTabs = () => {

	const { colorMode } = useColorMode();

	const borderColor = useColorModeValue('#E6DAFA', '#1a263c');
	const colorScheme = useColorModeValue('purple', 'purple');
	const tabsBgColor = colorMode === 'light' ? '#ffffff33': '#1a263c33';

    const tabsData: TabData[] = [
        {
            title: "Buy REKTcoin",
            content: BuyRektTab,
        },
        {
            title: "Sell REKTcoin",
            content: SellRektTab,
        },
    ]

    return (
		<VStack
			align='stretch'
			w={ACTION_TABS.VStackWidth}
		>
			<Tabs
				borderColor={borderColor}
				colorScheme={colorScheme}
				bg={tabsBgColor}
				isFitted
				borderRadius='md'
				borderWidth='1px'
			>
				<TabList mb='1em'>
					{tabsData.map((tab, index) => (
						<Tab key={index} >{tab.title}</Tab>
					))}
				</TabList>
				<TabPanels>
					{tabsData.map((tab, index) => (
						<TabPanel key={index} >
							<tab.content tabTitle={tab.title} />
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</VStack>
    )
}
