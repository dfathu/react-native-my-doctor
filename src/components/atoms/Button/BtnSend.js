import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconSendMsgDisable, IconSendMsgLight} from '../../../assets';
import {colors} from '../../../utils';

export default function BtnSend({disable,onPress}) {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <IconSendMsgDisable />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <IconSendMsgLight />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor: disable ? colors.disable : colors.teriary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});
