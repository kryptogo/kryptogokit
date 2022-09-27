export const getAlchemyBaseUrl = (chain: 'ethereum' | 'polygon') => {
  return chain === 'ethereum'
    ? 'https://eth-mainnet.alchemyapi.io'
    : 'https://polygon-mainnet.g.alchemy.com';
};
