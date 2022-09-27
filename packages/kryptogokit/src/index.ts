import { RainbowKitProvider as KryptogoKitProvider } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from './wallets/getDefaultWallets';

export * from '@rainbow-me/rainbowkit';

export { KryptogoKitProvider };
export { wallet } from './wallets/walletConnectors';
export { getDefaultWallets };
export { lightTheme } from './themes/lightTheme';
export { darkTheme } from './themes/darkTheme';
export { midnightTheme } from './themes/midnightTheme';
