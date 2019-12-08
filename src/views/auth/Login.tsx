import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import {commonStyles, colors} from '../../constants';
import FollowInput from '../../components/common/FollowInput';
import RoundButton from '../../components/common/RoundButton';
import {strings} from '../../locales/strings';
import SafeAreaView from 'react-native-safe-area-view';
import Icons from 'react-native-vector-icons/Feather';
import FancyInput from '../../components/common/FancyInput';

let buttons = [
  Array.from({length: 3}, (v, k) => k + 1),
  Array.from({length: 3}, (v, k) => k + 1),
  Array.from({length: 3}, (v, k) => k + 1),
];

const Login = ({navigation}) => {
  const [value, setvalue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    if (confirmed) {
      const timer = window.setInterval(() => {
        setCounter(counter - 1); // <-- Change this line!
        if (counter <= 0) {
          setCounter(0);
          setConfirmed(false);
          window.clearInterval(timer);
          return;
        }
      }, 1000);
      return () => {
        window.clearInterval(timer);
      };
    } else {
      setCounter(60);
    }
  });
  let count = 0;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingBottom: 30}}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.infoWrapper}>
            <Text style={styles.appName}>AvtoGen</Text>
            <Text style={styles.text}>
              {confirmed ? strings.confirmCode : strings.enterPhoneNumber}
            </Text>
            <View
              style={[
                styles.inputWrapper,
                !confirmed && {justifyContent: 'center'},
              ]}>
              <FancyInput
                value={value}
                exceedController={setvalue}
                pattern={
                  confirmed ? '_  _   _  _' : '+998|(_ _) _ _ _  _ _  _ _'
                }
              />
              {confirmed && (
                <Text style={{color: colors.white}}>{`${counter} сек`}</Text>
              )}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <View>
              {buttons.map((e, i) => {
                return (
                  <View style={styles.row}>
                    {e.map((el, index) => {
                      count++;
                      return (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            setvalue(value + (i * 3 + index + 1).toString())
                          }>
                          <View style={styles.squareButtonContainer}>
                            <Text style={styles.buttonText}>{count}</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </View>
                );
              })}
              <View style={styles.row}>
                <TouchableWithoutFeedback onPress={() => setvalue(value + '0')}>
                  <View style={styles.squareButtonContainer}>
                    <Text style={styles.buttonText}>0</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setvalue(value.substr(0, value.length - 1))}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 72,
                      height: 72,
                      margin: 10,
                    }}>
                    <Icons name="delete" size={40} color={colors.white} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <RoundButton
              text={strings.confirm}
              fill
              full
              backgroundColor={colors.white}
              onPress={() => {
                if (confirmed) {
                  navigation.navigate('SelectLanguage');
                } else {
                  setvalue('');
                  setConfirmed(!confirmed);
                }
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: colors.white,
    fontSize: 40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 250,
    padding: 15,
    margin: 30,
    marginBottom: 0,
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  squareButtonContainer: {
    borderRadius: 8,
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 10,
  },
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 22,
    color: colors.accent,
    fontWeight: 'bold',
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    margin: 10,
  },
});

export default Login;
