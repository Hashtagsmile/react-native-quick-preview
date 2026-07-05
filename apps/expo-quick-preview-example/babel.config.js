module.exports = function (api) {
  api.cache(true)
  return {
    // babel-preset-expo (SDK 54) already configures the Reanimated 4 /
    // react-native-worklets Babel plugin. Do NOT add it manually — a duplicate
    // plugin double-transforms worklets and breaks Reanimated's native binding
    // at runtime ("native module doesn't exist" in Expo Go).
    presets: ['babel-preset-expo'],
  }
}
