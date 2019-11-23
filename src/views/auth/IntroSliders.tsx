import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import {measures, colors} from '../../constants/index';
import LogoWithText from '../../components/LogoWithText';
import {commonStyles} from '../../constants/commonStyles';
import logo1 from '../../assets/images/first-slider.png';
import logo2 from '../../assets/images/second-slider.png';
import logo3 from '../../assets/images/third-slider.png';
import RoundButton from '../../components/common/RoundButton';
import {strings} from '../../locales/strings';

interface SliderProps {
  sliders: SliderData[];
}
export interface SliderData {
  image: object;
  text: string;
}

interface SliderContentProps {
  slider: SliderData;
  index: number;
  length: number;
  onPress: Function;
}

interface PaginationProps {
  value: Animated.Value;
  count: number;
}

let {width, height} = Dimensions.get('window');

const SliderContent = ({
  slider,
  index,
  length,
  onPress,
}: SliderContentProps) => {
  if (index === length - 1) {
    console.warn(index);
  }
  return (
    <View style={styles.contentContainer} key={index}>
      <View style={commonStyles.centeredContainer}>
        <Image style={styles.image} source={slider.image} />
      </View>
      <View style={[commonStyles.centeredContainer, styles.textContainer]}>
        <LogoWithText />
        <Text style={styles.text}>{slider.text}</Text>
        {index === length - 1 && (
          <RoundButton
            text={strings.next}
            fill
            full
            backgroundColor={colors.yellow}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

const Pagination = ({value, count}: PaginationProps) => {
  let values = [];
  for (let i = 0; i < count; i++) {
    values[i] = value.interpolate({
      inputRange: [(i - 1) * width, i * width, (i + 1) * width, count * width],
      outputRange: [1, 1.5, 1, 1],
      extrapolate: 'clamp',
    });
  }
  return (
    <View style={styles.paginationContainer}>
      {values.map((scale, index) => {
        return (
          <Animated.View
            key={index}
            style={[styles.indicator, {transform: [{scale}]}]}
          />
        );
      })}
    </View>
  );
};

let data = Array<SliderData>();
data.push({image: logo1, text: 'Ручная мойка кузова нано шампунем'});
data.push({
  image: logo2,
  text: 'Чистка салона пылесосом и влажная уборка пластмассовых деталей',
});
data.push({
  image: logo3,
  text: 'Покрытие кузова воском на основе тефлоновой полировки',
});

const Slider = ({sliders = data, navigation}: SliderProps) => {
  let value = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        // onMomentumScrollEnd={() => {
        //   setTimeout(() => {
        //     navigation.navigate('Prompt');
        //   }, 5000);
        // }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: value,
              },
            },
          },
        ])}
        pagingEnabled>
        {sliders.map((e, index) => {
          return (
            <SliderContent
              slider={e}
              key={index}
              index={index}
              length={sliders.length}
              onPress={() => {
                navigation.navigate('Prompt');
              }}
            />
          );
        })}
      </ScrollView>
      <Pagination value={value} count={sliders.length} />
    </View>
  );
};

let imageWidth = width - measures.padding * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: imageWidth,
    height: imageWidth / 1.7,
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  contentContainer: {
    width,
    height: height - 30,
  },
  text: {
    textAlign: 'center',
    width: 177,
    paddingTop: 30,
    color: colors.lightGray,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width,
  },
  indicator: {
    borderRadius: 15,
    width: 10,
    height: 10,
    backgroundColor: colors.accent,
    margin: 10,
  },
});

export default Slider;
