import TabList from "./TabList.svelte"
import TabItem from "./TabItem.svelte"
import TabPanel from "./TabPanel.svelte"

export const Tab = {
	List: TabList,
	Item: TabItem,
	Panel: TabPanel,
} as const