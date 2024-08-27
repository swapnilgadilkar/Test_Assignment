// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('@react-navigation/stack', () => {
  return {navigation: jest.fn()};
});
jest.mock('@react-navigation/native-stack', () => {});
