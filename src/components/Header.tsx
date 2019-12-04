import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import {Icons} from '../constants/icons';
import {colors} from '../constants/colors';
import {isIphoneXorAbove} from '../utils/application';

let fromValue = isIphoneXorAbove() ? 40 : 5;
let toValue = fromValue + 60;
const Header = ({text, isBack, backPress = () => {}, menuPress = () => {}}) => {
  let top = new Animated.Value(fromValue);
  const [expanded, setExpanded] = useState(fromValue);
  return (
    <Fragment>
      <Animated.View
        style={[
          styles.container,
          {
            top,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TextInput
          placeholder="Поиск..."
          style={{
            width: Dimensions.get('window').width - 90,
            padding: 0,
            margin: 0,
          }}
        />
        <Icons name={'search'} size={17} />
      </Animated.View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={isBack ? backPress : menuPress}>
          <View style={styles.left}>
            <Icons name={isBack ? 'back' : 'menu'} size={15} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.middle}>
          <Text>{text}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(top, {
              toValue: fromValue === expanded ? toValue : fromValue,
            }).start(() =>
              setExpanded(fromValue === expanded ? toValue : fromValue),
            );
          }}>
          <View style={styles.right}>
            <Icons
              name={expanded === toValue ? 'close' : 'search'}
              size={expanded === toValue ? 20 : 17}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: fromValue,
    right: 0,
    left: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 15,
    marginTop: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.ultraLightGray,
    paddingRight: 8,
    paddingVertical: 4,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
