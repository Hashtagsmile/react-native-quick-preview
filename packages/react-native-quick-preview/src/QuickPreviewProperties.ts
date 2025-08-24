import type { ReactNode } from 'react';
import type { Animated } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export type CloseReason = 'programmatic' | 'backdrop' | 'backButton' | 'swipe';


export interface QuickPreviewProps {
  visible: boolean;
  onClose: () => void;

   /** Lifecycle hooks (great for haptics/analytics) */
   onOpen?: () => void;                     // fires when animating in
   onClosed?: (reason: CloseReason) => void; // fires after fully closed
 

  theme?: ThemeMode;
  backdropOpacity?: number;    // default 0.5 light / 0.8 dark
  animationDuration?: number;  // default 220

  /** Behavior toggles */
  closeOnBackdropPress?: boolean; // default true
  closeOnBackButton?: boolean;    // default true
  enableSwipeToClose?: boolean;   // default true
  swipeThreshold?: number;        // default 80
  unmountOnExit?: boolean;        // default true
  avoidKeyboard?: boolean;        // default false

  /** Headless content */
  children?: ReactNode;

  /** Backdrop customization */
  renderBackdrop?: (opacity: Animated.AnimatedInterpolation<number>) => ReactNode;
  onBackdropPress?: () => void;

  /** Testing & a11y */
  testID?: string;
  accessibilityLabel?: string;

  /** Outer wrapper style overrides */
  stylesOverride?: {
    overlay?: any;
    container?: any;
    centerWrap?: any;
  };
}
