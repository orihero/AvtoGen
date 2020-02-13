import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icons from 'react-native-vector-icons/Feather';
import FancyInput from '../../components/common/FancyInput';
import RoundButton from '../../components/common/RoundButton';
import { colors } from '../../constants';
import { strings } from '../../locales/strings';
import requests from '../../api/requests';
import { userLoggedIn } from '../../redux/actions';
import { connect } from 'react-redux';

let buttons = [
  Array.from({ length: 3 }, (v, k) => k + 1),
  Array.from({ length: 3 }, (v, k) => k + 1),
  Array.from({ length: 3 }, (v, k) => k + 1),
];

const Login = ({ navigation, userLoggedIn }) => {
  const [value, setvalue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [counter, setCounter] = useState(60);
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  let count = 0;

  let getCode = () => {
    if (value.length < 9) {
      setError(strings.fillAllFields)
      return;
    }
    requests.auth.login({ phone: '998' + value }).then(res => {
      console.warn(res.data.data);
      setData(res.data.data)
    }).catch(res => {
      console.warn(res.response);
      if (!res.response) {
        console.warn(res.response);
        setError(strings.connectionError)
        return
      }
      let { response } = res;
      if (response.data) {
        setError(response.data.message ? response.data.message : strings.somethingWentWrong)
        return;
      }
      setError(strings.somethingWentWrong)
    });
    setConfirmed(!confirmed);
  }

  let confirmCode = () => {
    if (code.length < 5) {
      setError(strings.fillAllFields)
      return;
    }
    setLoading(true)
    requests.auth.verifyCode(data.user_id, { code })
      .then(res => {
        userLoggedIn(res.data.data);
        navigation.navigate('SelectLanguage');
      })
      .catch(res => {
        console.warn(res.response);
        if (!res.response) {
          console.warn(res.response);
          setError(strings.connectionError)
          return
        }
        let { response } = res;
        if (response.data) {
          setError(response.data.message ? response.data.message : strings.somethingWentWrong)
          return;
        }
        setError(strings.somethingWentWrong)
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    if (error !== '') {
      setError('')
    }
  }, [value, code])
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoWrapper}>
        <Text style={styles.appName}>AvtoGen</Text>
        <Text style={styles.text}>
          {confirmed ? strings.confirmCode : strings.enterPhoneNumber}
        </Text>
        <Text style={styles.dangerText}>
          {error}
        </Text>
        <View
          style={[
            styles.inputWrapper,
            !confirmed && { justifyContent: 'center' },
          ]}>
          <FancyInput
            value={confirmed ? code : value}
            exceedController={setvalue}
            pattern={
              confirmed ? '_ _ _ _ _' : '+998|(_ _) _ _ _  _ _  _ _'
            }
          />
          {confirmed && (
            <Text style={{ color: colors.white }}>{`${counter} ${strings.second}`}</Text>
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
                      onPress={() => confirmed ? setCode(code + (i * 3 + index + 1).toString()) :
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
            <TouchableWithoutFeedback onPress={() => confirmed ? setCode(code + "0") : setvalue(value + '0')}>
              <View style={styles.squareButtonContainer}>
                <Text style={styles.buttonText}>0</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => confirmed ? setCode(code.substr(0, code.length - 1)) : setvalue(value.substr(0, value.length - 1))}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 72,
                  height: 72,
                  margin: 8,
                }}>
                <Icons name="delete" size={40} color={colors.white} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <RoundButton
          text={confirmed ? strings.confirm : strings.continue}
          fill
          full
          loading={loading}
          backgroundColor={colors.white}
          onPress={() => {
            if (confirmed) {
              confirmCode()
            } else {
              getCode()
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ }) => ({

})

const mapDispatchToProps = {
  userLoggedIn
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  appName: {
    color: colors.white,
    fontSize: 40,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.accent
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 250,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  squareButtonContainer: {
    borderRadius: 8,
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 8,
  },
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 5,
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
    margin: 5,
  },
  dangerText: {
    color: colors.red,
    textAlign: 'center',
    margin: 5,
  }
});

