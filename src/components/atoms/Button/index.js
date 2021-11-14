import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import BtnSend from './BtnSend';
import IconOnly from './IconOnly';

const Button = ({type, text, onPress, icon, disable}) => {
  if(type === 'btn-send') {
    return <BtnSend disable={disable} onPress={onPress}/>
  }
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if(disable)
  {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{text}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor:
      type === 'Secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
  }),
  text: type => ({
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color:
      type === 'Secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),
  disableBg:{
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.grey.background,
  },
  disableText: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color:colors.button.grey.text,
  },
});
