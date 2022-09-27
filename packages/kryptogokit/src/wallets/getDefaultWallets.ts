import {
  Chain,
  connectorsForWallets,
  wallet,
  WalletList,
} from '@rainbow-me/rainbowkit';
import { kryptogo } from './walletConnectors/kryptogo/kryptogo';

export const getDefaultWallets = ({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Recommended',
      wallets: [kryptogo({ chains }), wallet.walletConnect({ chains })],
    },
    {
      groupName: 'Other',
      wallets: [
        wallet.metaMask({ chains }),
        wallet.rainbow({ chains }),
        wallet.trust({ chains }),
        wallet.coinbase({ appName, chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
