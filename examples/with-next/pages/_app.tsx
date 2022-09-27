import '../styles/global.css';
import '@kryptogo/kryptogokit/styles.css';
import type { AppProps } from 'next/app';
import {
  KryptogoKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
} from '@kryptogo/kryptogokit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);

const appName = 'KryptoGOKit Demo';
const { wallets } = getDefaultWallets({
  chains,
});

const demoAppInfo = {
  appName,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.trust({ chains }),
      wallet.coinbase({ appName, chains }),
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <KryptogoKitProvider appInfo={demoAppInfo} chains={chains}>
        <Component {...pageProps} />
      </KryptogoKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
