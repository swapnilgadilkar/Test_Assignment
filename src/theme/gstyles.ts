import {Platform} from 'react-native';
import palette from './palete';
import {ms, ScaledSheet} from 'react-native-size-matters';

const GLOBAL_STYLES = ScaledSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: palette.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: ms(2),
      },
      android: {
        shadowColor: palette.black,
        elevation: '4@ms',
        shadowRadius: ms(2),
        shadowOpacity: 0.4,
      },
      default: {
        // other platforms,
      },
    }),
  },
});

export {GLOBAL_STYLES};
