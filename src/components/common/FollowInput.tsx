import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../../constants';

interface FollowInputProps {
  pattern: string;
}

const FollowInput = ({pattern = '+998|(# #) # # #  # #'}: FollowInputProps) => {
  //TODO:  write down escape characters
  const [index, setIndex] = useState(0);
  const [value, setvalue] = useState('');
  let inputsCount = 0;
  let refs = [];
  let generateContent = () => {
    let content = [];
    let parts = pattern.split('');
    let temp = '';
    for (let part of parts) {
      if (part === '#') {
        content.push({type: 'text', content: temp});
        content.push({type: 'input'});
        temp = '';
        continue;
      }
      temp += part;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      {generateContent().map(({type, content}, i) => {
        switch (type) {
          case 'text':
            return <Text style={styles.text}>{content}</Text>;
          case 'input':
            inputsCount++;
            return (
              <TextInput
                keyboardType="numeric"
                placeholder={'_'}
                style={styles.input}
                placeholderTextColor={colors.white}
                selectTextOnFocus
                returnKeyType={'next'}
                blurOnSubmit={false}
                value={value[inputsCount - 1] && value[inputsCount - 1][0]}
                onChangeText={character => {
                  if (refs[index + 1]) {
                    refs[index + 1].ref.focus();
                    setIndex(index + 1);
                  } else {
                    return;
                  }
                  setvalue(value + character);
                }}
                ref={ref => refs.push({ref})}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 30,
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    fontSize: 18,
  },
  input: {
    fontSize: 18,
    color: colors.white,
  },
});

export default FollowInput;
