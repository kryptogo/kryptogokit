import Doge0 from '../../../assets/doge0.png';
import Doge1 from '../../../assets/doge1.png';
import Doge2 from '../../../assets/doge2.png';
import Doge3 from '../../../assets/doge3.png';
import Doge4 from '../../../assets/doge4.png';
import Doge5 from '../../../assets/doge5.png';
import Doge6 from '../../../assets/doge6.png';
import Doge7 from '../../../assets/doge7.png';
import Doge8 from '../../../assets/doge8.png';
import Doge9 from '../../../assets/doge9.png';

const avatars = [
  { image: Doge0 },
  { image: Doge1 },
  { image: Doge2 },
  { image: Doge3 },
  { image: Doge4 },
  { image: Doge5 },
  { image: Doge6 },
  { image: Doge7 },
  { image: Doge8 },
  { image: Doge9 },
] as const;

function hashCode(text: string) {
  let hash = 0;
  if (text.length === 0) return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export function dogeAvatarForAddress(address: string) {
  const resolvedAddress = typeof address === 'string' ? address : '';
  const avatarIndex = Math.abs(
    hashCode(resolvedAddress.toLowerCase()) % avatars.length
  );
  return avatars[avatarIndex ?? 0];
}
