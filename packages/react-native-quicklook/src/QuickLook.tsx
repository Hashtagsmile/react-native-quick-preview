import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View, StyleSheet, Modal, Dimensions, Animated, Platform,
  Pressable, PanResponder, Keyboard,
} from 'react-native';
import type { AccessibilityRole } from 'react-native';
import type { QuickLookProps, ThemeMode } from './QuickLookProperties';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// TS-safe across RN versions where "dialog" may not exist in AccessibilityRole
const dialogA11yRole = 'dialog' as unknown as AccessibilityRole;

const overlayColor = (theme: ThemeMode, custom?: number) =>
  `rgba(0,0,0,${custom ?? (theme === 'dark' ? 0.8 : 0.5)})`;

export const QuickLook: React.FC<QuickLookProps> = ({
  visible,  
  onClose,
  onPressCard,
  theme = 'light',
  backdropOpacity,
  animationDuration = 220,
  closeOnBackdropPress = true,
  closeOnBackButton = true,
  enableSwipeToClose = true,
  swipeThreshold = 80,
  unmountOnExit = true,
  avoidKeyboard = false,
  children,
  renderBackdrop,
  onBackdropPress,
  testID = 'quicklook',
  accessibilityLabel = 'Quick look',
  stylesOverride = {},
}) => {
  const [mounted, setMounted] = useState(false);
  const [kb, setKb] = useState(0); // keyboard height

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const baseOverlay = useMemo(() => overlayColor(theme, backdropOpacity), [theme, backdropOpacity]);

  // Mount/unmount with animation
  useEffect(() => {
    if (visible && !mounted) {
      setMounted(true);
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(fade, { toValue: 1, duration: animationDuration, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 7, tension: 80 }),
        ]).start();
      });
    } else if (!visible && mounted) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 0, duration: animationDuration, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.96, duration: animationDuration, useNativeDriver: true }),
      ]).start(() => {
        translateY.setValue(0);
        if (unmountOnExit) setMounted(false);
      });
    }
  }, [visible, mounted, animationDuration, fade, scale, translateY, unmountOnExit]);

  // Keyboard avoidance (optional)
  useEffect(() => {
    if (!avoidKeyboard) return;
    const show = Keyboard.addListener('keyboardDidShow', (e) => setKb(e.endCoordinates?.height ?? 0));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKb(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [avoidKeyboard]);

  // Swipe to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, g) =>
        enableSwipeToClose && Math.abs(g.dy) > Math.abs(g.dx) && Math.abs(g.dy) > 5,
      onPanResponderMove: (_evt, g) => {
        if (!enableSwipeToClose) return;
        if (g.dy > 0) {
          translateY.setValue(g.dy);
          const p = Math.min(1, g.dy / (swipeThreshold * 2));
          fade.setValue(1 - p * 0.25);
          scale.setValue(1 - p * 0.03);
        }
      },
      onPanResponderRelease: (_evt, g) => {
        if (!enableSwipeToClose) return;
        if (g.dy > swipeThreshold) {
          Animated.parallel([
            Animated.timing(translateY, { toValue: screenHeight * 0.35, duration: 180, useNativeDriver: true }),
            Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }),
          ]).start(() => onClose?.());
        } else {
          Animated.parallel([
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
            Animated.spring(fade, { toValue: 1, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
          ]).start();
        }
      },
    })
  ).current;

  if (!mounted && !visible) return null;

  return (
    <Modal  
      transparent   
      visible={mounted || visible}
      animationType="none"
      onRequestClose={() => (closeOnBackButton ? onClose?.() : undefined)}
      presentationStyle="overFullScreen"
      statusBarTranslucent={Platform.OS === 'android'}
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.overlay,
          { backgroundColor: baseOverlay, opacity: fade },
          stylesOverride.overlay,
        ]}
        accessibilityViewIsModal
      >
        {renderBackdrop
          ? renderBackdrop(fade as unknown as Animated.AnimatedInterpolation<number>)
          : (
            <Pressable
              onPress={() => {
                onBackdropPress?.();
                if (closeOnBackdropPress) onClose?.();
              }}
              style={StyleSheet.absoluteFill}
              android_disableSound
              accessibilityRole="button"
              accessibilityLabel="Close quick look"
              testID="ql-backdrop"
            />
          )}

        {/* Centered card */}
        <View
          style={[
            styles.centerWrap,
            { paddingBottom: Math.max(16, avoidKeyboard ? kb : 16) },
            stylesOverride.centerWrap,
          ]}
          pointerEvents="box-none"
        >
          <Animated.View
            {...(enableSwipeToClose ? panResponder.panHandlers : {})}
            style={[
              styles.container,
              { transform: [{ scale }, { translateY }] },
              stylesOverride.container,
            ]}
            testID={testID}
            accessibilityRole={dialogA11yRole}  // safe cast for older RN types
            accessibilityViewIsModal
            accessibilityLabel={accessibilityLabel}
          >
            {onPressCard ? (
              <Pressable onPress={onPressCard} android_disableSound style={{ flex: 1 }}>
                {children}
              </Pressable>
            ) : (
              children
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerWrap: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    width: Math.min(screenWidth * 0.92, 560),
    maxHeight: screenHeight * 0.82,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: '#fff',
  },
});
