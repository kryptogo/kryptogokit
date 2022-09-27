import { KryptogoKitProvider } from './components/KryptogoKitProvider/KryptogoKitProvider';
import { getDefaultWallets } from './wallets/getDefaultWallets';

export * from '@rainbow-me/rainbowkit';

export { KryptogoKitProvider };
export { wallet } from './wallets/walletConnectors';
export { getDefaultWallets };
export { lightTheme } from './themes/lightTheme';
export { darkTheme } from './themes/darkTheme';
export { midnightTheme } from './themes/midnightTheme';
export { default as useHasNft } from './hooks/useHasNft';
