import { ConnectButton, useHasNft } from '@kryptogo/kryptogokit';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';

const NftAmountPage: NextPage = () => {
  const { address } = useAccount();
  const { amount, loading, error } = useHasNft({
    ownerAddress: address ?? '',
    alchemyApiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    contractAddress: '0xa6916545a56f75acd43fb6a1527a73a41d2b4081',
    chain: 'ethereum',
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
      <div>
        {!address && <div>You are not connected</div>}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {address && !loading && !error && (
          <div>You have {amount} Demi Human NFTs</div>
        )}
      </div>
    </>
  );
};

export default NftAmountPage;
