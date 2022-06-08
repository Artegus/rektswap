import { config } from "../../config";

enum SupportedChainId {
  	POLYGON = config.CHAIN_ID,
	//MUMBAI = 80001
  	//KOVAN = 42
}

const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[];


export { SupportedChainId, ALL_SUPPORTED_CHAIN_IDS };
