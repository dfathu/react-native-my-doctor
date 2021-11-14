import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconBtnAddPhoto, IconBtnRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function Profile({type, name, desc, photo, onPress, gender}) {
  return (
    <View style={styles.container}>
      {!type && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )}
      {type && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {type && <IconBtnRemovePhoto style={styles.removephoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{desc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderProfile: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border.satu,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  profession: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  removephoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
