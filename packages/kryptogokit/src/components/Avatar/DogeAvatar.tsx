import { AvatarComponent } from '@rainbow-me/rainbowkit';
import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '../Box/Box';
import { SpinnerIcon } from '../Icons/Spinner';
import { dogeAvatarForAddress } from './dogeAvatarForAddress';

export const DogeAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);

  const { image } = useMemo(() => dogeAvatarForAddress(address), [address]);
  return ensImage ? (
    loaded ? (
      <Box
        backgroundSize="cover"
        borderRadius="full"
        position="absolute"
        style={{
          backgroundImage: `url(${ensImage})`,
          backgroundPosition: 'center',
          height: size,
          width: size,
        }}
      />
    ) : (
      <Box
        alignItems="center"
        backgroundSize="cover"
        borderRadius="full"
        color="modalText"
        display="flex"
        justifyContent="center"
        position="absolute"
        style={{
          height: size,
          width: size,
        }}
      >
        <SpinnerIcon />
      </Box>
    )
  ) : (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: size,
        width: size,
      }}
    />
  );
};
