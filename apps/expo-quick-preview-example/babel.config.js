module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],  // includes Expo Router in SDK 50+
    plugins: [
      'react-native-worklets/plugin', // Reanimated v3+ plugin
    ],
  }
}
