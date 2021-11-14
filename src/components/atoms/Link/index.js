import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { colors, fonts } from '../../../utils';

export default function Link({size, text, align, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(size,align)}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: (size,align) => ({
    fontSize: size,
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    color: colors.text.secondary,
    textAlign: align
  }),
});
