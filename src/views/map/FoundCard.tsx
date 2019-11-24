import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../../constants/colors';
import {Icons} from '../../constants/icons';
import RoundButton from '../../components/common/RoundButton';
import {strings} from '../../locales/strings';

const FoundCard = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={styles.indicator}></View>
        </View>

        <View style={styles.top}>
          <View style={styles.iconWrapper}>
            <Icons name="wash" size={40} />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>AVTOritet Car-Wash</Text>
            <Text style={styles.location}>ул. Лабзак, 12/1, Tashkent</Text>
          </View>
          <View style={styles.distanceWrapper}>
            <Text style={styles.distance}>1.7 Km</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.borderTop}>
              <Text style={styles.mainText}>8 97 444 07 50</Text>
            </View>
            <View style={[styles.borderTop, styles.timeWrapper]}>
              <TouchableWithoutFeedback
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setExpanded(!expanded);
                }}>
                <View style={styles.timeHeader}>
                  <View style={styles.twoBorder}>
                    <Text style={styles.mainText}>Открыто сейчас</Text>
                    <Text style={styles.mainText}>09:00-21:00</Text>
                  </View>
                  <Icons
                    name="down-chevron"
                    style={{
                      transform: [{rotate: expanded ? '180deg' : '0deg'}],
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
              {expanded && (
                <View>
                  <View style={styles.twoBorder}>
                    <Text style={[styles.timeText, styles.bold]}>Вторник</Text>
                    <Text style={[styles.timeText, styles.bold]}>
                      10:00–22:00
                    </Text>
                  </View>
                  <View style={styles.twoBorder}>
                    <Text style={styles.timeText}>Среда</Text>
                    <Text style={styles.timeText}>10:00–22:00</Text>
                  </View>
                  <View style={styles.twoBorder}>
                    <Text style={styles.timeText}>Четверг</Text>
                    <Text style={styles.timeText}>10:00–22:00</Text>
                  </View>
                  <View style={styles.twoBorder}>
                    <Text style={styles.timeText}>Пятница</Text>
                    <Text style={styles.timeText}>10:00–22:00</Text>
                  </View>
                  <View style={styles.twoBorder}>
                    <Text style={styles.timeText}>Суббота</Text>
                    <Text style={styles.timeText}>10:00–22:00</Text>
                  </View>
                  <View style={styles.twoBorder}>
                    <Text style={styles.timeText}>Воскресенье</Text>
                    <Text style={styles.timeText}>10:00–22:00</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.borderTop}>
              <Text style={styles.mainText}>Рейтинг 4.5</Text>
            </View>
            <View style={styles.borderTop}>
              <Text style={styles.mainText}>Wi Fi</Text>
            </View>
            <View style={styles.borderTop}>
              <Text style={styles.mainText}>Кафе</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View style={{flex: 1}}>
          <RoundButton
            borderColor={colors.black}
            backgroundColor={colors.white}
            fill
            full
            text={strings.route}
          />
        </View>
        <View style={{flex: 1}}>
          <RoundButton
            fill
            full
            backgroundColor={colors.yellow}
            text={strings.subscribe}
          />
        </View>
      </View>
    </React.Fragment>
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
    paddingHorizontal: 30,
    borderRadius: 30,
    maxHeight: 550,
    // alignItems: 'center',
    // flexDirection: 'column',
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    margin: 10,
    marginTop: 5,
  },
  top: {
    flexDirection: 'row',
  },
  iconWrapper: {},
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    color: colors.lightGray,
  },
  distanceWrapper: {},
  distance: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    paddingVertical: 15,
    marginBottom: 50,
  },
  borderTop: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.ultraLightGray,
  },
  timeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 16,
  },
  twoBorder: {
    paddingVertical: 7,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {},
  bold: {
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
});

export default FoundCard;
