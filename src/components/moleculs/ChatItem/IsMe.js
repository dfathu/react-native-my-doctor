import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function IsMe({text,date}) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, alignItems: 'flex-end',paddingRight: 16
  },
  chatContent: {
    maxWidth: '70%', 
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.cardight.background,
    borderRadius: 10,
    borderBottomRightRadius: 0
  },
  text: {
    fontFamily: fonts.primary.normal,
    fontSize: 14,
    color: colors.text.primary,
  },
  date: {
    fontFamily: fonts.primary.normal,
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
