import {
  AvatarComponent,
  DisclaimerComponent,
  RainbowKitProvider,
  Theme,
} from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import { lightTheme } from '../../themes/lightTheme';

const ModalSizeOptions = {
  COMPACT: 'compact',
  WIDE: 'wide',
} as const;

type ModalSizes = typeof ModalSizeOptions[keyof typeof ModalSizeOptions];

export interface KryptogoKitProviderProps {
  chains: RainbowKitChain[];
  initialChain?: RainbowKitChain | number;
  id?: string;
  children: ReactNode;
  theme?: Theme | null;
  showRecentTransactions?: boolean;
  appInfo?: {
    appName?: string;
    learnMoreUrl?: string;
    disclaimer?: DisclaimerComponent;
  };
  coolMode?: boolean;
  avatar?: AvatarComponent;
  modalSize?: ModalSizes;
}

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
}: KryptogoKitProviderProps) {
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
