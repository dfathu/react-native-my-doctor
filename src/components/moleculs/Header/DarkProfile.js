import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../..';
import { DummyDoctor1 } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function DarkProfile({onPress, title,desc, photo}) {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon={'back-light'} onPress={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.category}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingRight: 16,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {flex: 1},
  name: {
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.white,
    marginBottom: 6,
    textTransform: 'capitalize'
  },
  category: {
    textAlign: 'center',
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.text.secondary,
    textTransform: 'capitalize'
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
});
