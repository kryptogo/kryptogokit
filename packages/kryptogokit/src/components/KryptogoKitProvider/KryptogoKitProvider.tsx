import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ModalSizeOptions } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalSizeContext';
import { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import { lightTheme } from '../../themes/lightTheme';

const defaultTheme = lightTheme();

export function KryptogoKitProvider({
  chains,
  initialChain,
  id,
  theme = defaultTheme,
  children,
  appInfo,
  showRecentTransactions = false,
  coolMode = false,
  avatar,
  modalSize = ModalSizeOptions.WIDE,
}: RainbowKitProviderProps) {
  return RainbowKitProvider({
    appInfo,
    avatar,
    chains,
    children,
    coolMode,
    id,
    initialChain,
    modalSize,
    showRecentTransactions,
    theme,
  });
}
