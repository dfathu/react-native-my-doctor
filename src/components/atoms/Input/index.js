import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {
  const [border, setBorder] = useState(colors.border.satu);

  const onFocusForm = () => {
    setBorder(colors.teriary);
  };

  const onBlurForm = () => {
    setBorder(colors.border.satu);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
    marginBottom: 6,
    color: colors.text.secondary,
  },
  input: border => ({
    borderRadius: 10,
    borderWidth: 1,
    borderColor: border,
    padding: 12,
    color: colors.text.primary,
    fontFamily: fonts.primary.normal,
    fontSize: 16,
  }),
});
