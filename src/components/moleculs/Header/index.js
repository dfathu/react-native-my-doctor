import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';
import DarkProfile from './DarkProfile';

const Header = ({onPress, title,desc,photo, type}) => {
  if(type === 'dark-profile') {
    return <DarkProfile title={title} desc={desc} photo={photo} onPress={onPress}/>
  }
  return (
    <View style={styles.container(type)}>
      <Button type="icon-only" icon={type === 'dark' ? "back-light" : "back-dark"} onPress={onPress} />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap height={24} width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    borderBottomRightRadius : type === 'dark' ? 20 : 0,
    borderBottomLeftRadius : type === 'dark' ? 20 : 0
  }),
  text: type => ({
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 20,
    lineHeight: 27,
    textTransform : 'capitalize',
    color: type === 'dark' ? colors.white : colors.secondary,
  }),
  icon: {
    width: 24,
    height: 24,
  },
});
