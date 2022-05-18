enum SupportedChainId {
  MAINNET = 1,
  POLYGON = 137,
  KOVAN = 42
};

const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[];


export { SupportedChainId, ALL_SUPPORTED_CHAIN_IDS };
