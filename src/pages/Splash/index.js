import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets/illustrations';
import Fire from '../../config/Fire';
import { colors, fonts } from '../../utils';

export default function Splash({navigation}) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Fire('auth'), (user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Get Started');
        }
      }, 3000);
    });
    
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    marginTop: 20,
  },
});
