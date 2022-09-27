import {
  Chain,
  connectorsForWallets,
  wallet,
  WalletList,
} from '@rainbow-me/rainbowkit';
import { kryptogo } from './walletConnectors/kryptogo/kryptogo';

export const getDefaultWallets = ({
  chains,
}: {
  chains: Chain[];
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Recommended',
      wallets: [
        kryptogo({ chains }),
        wallet.metaMask({ chains }),
        wallet.walletConnect({ chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
