import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconEditProfile, IconHelp, IconLanguange, IconNextMsg, IconRate } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function List({type,profile, name, desc,onPress,icon}) {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />
    }
    if (icon === 'language') {
      return <IconLanguange />
    }
    if (icon === 'rate') {
      return <IconRate />
    }
    if (icon === 'help') {
      return <IconHelp />
    }
    return <IconEditProfile />
  }

  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.wrapperProfile(type,icon)}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {
        type === 'next' && <IconNextMsg />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (type) =>  ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: colors.border.dua,
    borderBottomWidth: 1,
    justifyContent: type === 'next' ? 'space-between' : 'flex-start'
  }),
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46/2
  },
  wrapperProfile : (type, icon) => ({
    flex: type === 'next' ? 1 : 0,
    marginLeft : icon ? 16 : 12,
  }),
  name: {
      fontFamily: fonts.primary[600],
      fontSize: 16,
      textTransform: 'capitalize',
      color: colors.text.primary,
  },
  desc: {
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  }
});
