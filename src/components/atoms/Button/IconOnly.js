import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconArrowback, IconArrowBackLight } from '../../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconArrowback />;
    }
    if (icon === 'back-light') {
      return <IconArrowBackLight />;
    }
    return <IconArrowback />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
