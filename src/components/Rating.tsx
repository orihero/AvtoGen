import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {colors, Icons} from '../constants';

const Rating = ({
  count = 0,
  color = colors.lightYellow,
  activeCount = 0,
  containerStyle,
  inactiveColor = colors.lightGray,
  setActiveCount = () => {},
  size = 30,
}) => {
  let [icons, setIcons] = useState([]);
  useEffect(() => {
    let ics = [];
    for (let i = 0; i < count; i++) {
      ics.push(i);
    }
    setIcons(ics);
  }, [count]);
  return (
    <View style={{flexDirection: 'row', ...containerStyle}}>
      {icons.map(i => (
        <TouchableWithoutFeedback
          onPress={() => {
            setActiveCount(i + 1);
          }}>
          <Icons
            name={'star'}
            style={{opacity: activeCount <= i ? 0.3 : 1, padding: 5}}
            color={activeCount <= i ? inactiveColor : color}
            size={size}
          />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
export default Rating;
