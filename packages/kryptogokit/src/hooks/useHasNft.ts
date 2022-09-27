import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAlchemyBaseUrl } from '../utils/alchemy';

export default function useHasNft(props: {
  ownerAddress: string;
  alchemyApiKey: string;
  contractAddress: string;
  chain: 'ethereum' | 'polygon';
}) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setAmount(0);
    setLoading(true);
    setError(null);

    // pre-condition
    if (!props.contractAddress || !props.alchemyApiKey || !props.ownerAddress) {
      setLoading(false);
      return;
    }

    const alchemyBaseUrl = getAlchemyBaseUrl(props.chain);
    axios
      .get(`${alchemyBaseUrl}/nft/v2/${props.alchemyApiKey}/getNFTs`, {
        params: {
          'contractAddresses[]': props.contractAddress,
          'owner': props.ownerAddress,
          'withMetadata': false,
        },
      })
      .then(res => res.data)
      .then(data => {
        setAmount(data.totalCount);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [
    props.contractAddress,
    props.alchemyApiKey,
    props.chain,
    props.ownerAddress,
  ]);

  return { amount, error, loading };
}
