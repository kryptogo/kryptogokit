import { wallet as rbWallet } from '@rainbow-me/rainbowkit';
import { kryptogo } from './kryptogo/kryptogo';

export const wallet = {
  argent: rbWallet.argent,
  brave: rbWallet.brave,
  coinbase: rbWallet.coinbase,
  imToken: rbWallet.imToken,
  injected: rbWallet.injected,
  kryptogo,
  ledger: rbWallet.ledger,
  metaMask: rbWallet.metaMask,
  omni: rbWallet.omni,
  rainbow: rbWallet.rainbow,
  /** @deprecated */
  steak: rbWallet.steak,
  trust: rbWallet.trust,
  walletConnect: rbWallet.walletConnect,
};
