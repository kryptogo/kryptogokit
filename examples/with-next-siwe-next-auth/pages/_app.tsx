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
import { SessionProvider } from 'next-auth/react';
import {
  KryptogoKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@kryptogo/kryptogokit-siwe-next-auth';

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

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the KryptoGOKit + SIWE example app',
});

export default function App({ Component, pageProps }: AppProps<any>) {
  return (
    <SessionProvider refetchInterval={0} session={pageProps.session}>
      <WagmiConfig client={wagmiClient}>
        <KryptogoKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <KryptogoKitProvider appInfo={demoAppInfo} chains={chains}>
            <Component {...pageProps} />
          </KryptogoKitProvider>
        </KryptogoKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}
