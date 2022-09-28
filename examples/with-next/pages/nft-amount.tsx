import { ConnectButton, useHasNft } from '@kryptogo/kryptogokit';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const NftAmountPage: NextPage = () => {
  const account = useAccount();
  const [connected, setConnected] = useState(false);
  const { amount, loading, error } = useHasNft({
    ownerAddress: account.address ?? '',
    alchemyApiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    contractAddress: '0xa82fa2c0fd1fc6bb964d9302d3507b88a5f1b8d0',
    chain: 'polygon',
  });

  useEffect(() => {
    setConnected(account.status == 'connected' && account.address != '');
  }, [account]);

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
      {!connected ? (
        <div>You are not connected</div>
      ) : (
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error?.message ?? error}</div>}
          {!loading && !error && (
            <div>You have {amount} KryptoGO Yacht Club NFTs</div>
          )}
        </div>
      )}
    </>
  );
};

export default NftAmountPage;
