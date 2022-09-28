# kryptogokit-siwe-next-auth

[Sign-In with Ethereum](https://login.xyz) and [NextAuth.js](https://next-auth.js.org) authentication adapter for [KryptoGOKit](https://kit.kryptogo.com).

This package is designed to work with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

## Usage

### Set up Sign-In with Ethereum and NextAuth.js

If you haven't already, first set up your [Next.js](https://nextjs.org) project with the [official Sign-In with Ethereum boilerplate for NextAuth.js.](https://docs.login.xyz/integrations/nextauth.js)

### Install

Install the `@kryptogo/kryptogokit-siwe-next-auth` package.

```bash
npm install @kryptogo/kryptogokit-siwe-next-auth
```

### Set up the provider

In your `App` component, import `KryptogoKitSiweNextAuthProvider`.

```tsx
import { KryptogoKitSiweNextAuthProvider } from '@kryptogo/kryptogokit-siwe-next-auth';
```

Wrap `KryptogoKitProvider` with `KryptogoKitSiweNextAuthProvider`, ensuring it's nested within NextAuth's `SessionProvider` so that it has access to the session.

```tsx
import { KryptogoKitSiweNextAuthProvider } from '@kryptogo/kryptogokit-siwe-next-auth';
import { KryptogoKitProvider } from '@kryptogo/kryptogokit';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig {...etc}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <KryptogoKitSiweNextAuthProvider>
          <KryptogoKitProvider {...etc}>
            <Component {...pageProps} />
          </KryptogoKitProvider>
        </KryptogoKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
```

With `KryptogoKitSiweNextAuthProvider` in place, your users will now be prompted to authenticate by signing a message once they've connected their wallet.

### Customize the SIWE message options

You can customize the [SIWE message options](https://github.com/spruceid/siwe/blob/v1.1.6/packages/siwe/lib/client.ts#L29) by passing a function to the `getSiweMessageOptions` prop on `KryptogoKitSiweNextAuthProvider`.

This function will be called whenever a new message is created. Options returned from this function will be merged with the defaults.

```tsx
import {
  KryptogoKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@kryptogo/kryptogokit-siwe-next-auth';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to my KryptoGOKit app',
});

<KryptogoKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
  ...
</KryptogoKitSiweNextAuthProvider>;
```

### Access the session server-side

You can access the session token with NextAuth's `getToken` function imported from `next-auth/jwt`. If the user has successfully authenticated, the session token's `sub` property (the "subject" of the token, i.e. the user) will be the user's address.

You can also pass down the resolved session object from the server via `getServerSideProps` so that NextAuth doesn't need to resolve it again on the client.

For example:

```tsx
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function AuthenticatedPage({ address }: AuthenticatedPageProps) {
  return address ? (
    <h1>Authenticated as {address}</h1>
  ) : (
    <h1>Unauthenticated</h1>
  );
}
```

For more information about managing the session, you can refer to the following documentation:

- [Next.js authentication guide](https://nextjs.org/docs/authentication)
- [NextAuth.js documentation](https://next-auth.js.org)

## Contributing

Please follow our [contributing guidelines](../../.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © 2022-present [KryptoGO](https://kryptogo.com).

See [LICENSE](../../LICENSE) for more information.
