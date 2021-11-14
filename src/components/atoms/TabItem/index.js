import React from 'react';
import {StyleSheet, Text,TouchableOpacity} from 'react-native';
import {
  IconDoctorActive,
  IconDoctorInactive,
  IconMapActive,
  IconMapInactive,
  IconMsgActive,
  IconMsgInactive,
} from '../../../assets/icons';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctorInactive />;
    }
    if (title === 'Messages') {
      return active ? <IconMsgActive /> : <IconMsgInactive />;
    }
    if (title === 'Hospitals') {
      return active ? <IconMapActive /> : <IconMapInactive />;
    }
    return <IconDoctorInactive />;
  };

  return (
    <TouchableOpacity style={styles.content} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  text: (active) => ({
    color: active ? colors.text.menuactive : colors.text.menuInactive,
    fontFamily : fonts.primary[600],
    marginTop: 4
  }),
});
