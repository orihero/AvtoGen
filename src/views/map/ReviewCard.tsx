import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {colors, commonStyles} from '../../constants';
import Icons from 'react-native-vector-icons/Feather';
import {strings} from '../../locales/strings';
import Rating from '../../components/Rating';
import RoundButton from '../../components/common/RoundButton';

const ReviewCard = ({navigation, onSubmit = () => {}}) => {
  let onPress = onSubmit;
  const [rating, setRating] = useState(3);
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.indicator} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.iconWrapper}>
            <Icons
              name="check"
              size={40}
              color={colors.white}
              style={{transform: [{translateY: 3}]}}
            />
          </View>
          <Text style={styles.lightText}>{strings.carWash}</Text>
          <Text style={styles.nameText}>AVTOritet Car-Wash</Text>
          <Text style={styles.thanksText}>{strings.thanks}</Text>
          <Rating activeCount={rating} setActiveCount={setRating} count={5} />
          <Text style={[styles.lightText, {fontSize: 18}]}>{strings.rate}</Text>
        </View>
        <View style={styles.commentWrapper}>
          <TextInput
            multiline
            numberOfLines={2}
            placeholder={strings.leaveComment}
          />
        </View>
      </ScrollView>
      <RoundButton
        fill
        full
        text={strings.rate}
        backgroundColor={colors.yellow}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    maxHeight: 700,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 22,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    margin: 10,
    marginTop: 5,
  },
  iconWrapper: {
    backgroundColor: colors.lightBlue,
    borderRadius: 40,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  lightText: {
    color: colors.lightGray,
  },
  thanksText: {
    fontSize: 18,
    color: colors.accent,
    marginVertical: 40,
  },
  commentWrapper: {
    borderRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.extraGray,
    borderWidth: 1,
    padding: 20,
    marginVertical: 30,
  },
});

export default ReviewCard;
