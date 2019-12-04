import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants';

interface FancyInputProps {
  pattern?: string;
  value: string;
  exceedController?: Function;
}
const FancyInput = ({
  pattern = '+998 | (_  _) _   _  _   _  _   _  _',
  value,
  exceedController,
}: FancyInputProps) => {
  let generateContent = () => {
    let content = [];
    let parts = pattern.split('');
    let temp = '';
    for (let part of parts) {
      if (part === '_') {
        content.push({type: 'text', content: temp});
        content.push({type: 'input'});
        temp = '';
        continue;
      }
      temp += part;
    }
    return content;
  };
  useEffect(() => {
    if (value.length > counter) {
      exceedController(value.substr(0, counter));
    }
  }, [value]);
  let counter = 0;
  return (
    <View style={styles.container}>
      {generateContent().map(({type, content}) => {
        switch (type) {
          case 'text':
            return <Text style={styles.text}>{content}</Text>;
          case 'input':
            counter++;
            return (
              <Text style={styles.text}>
                {value[counter - 1] ? value[counter - 1] : '_'}
              </Text>
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  text: {
    color: colors.white,
    fontSize: 18,
  },
});

export default FancyInput;
