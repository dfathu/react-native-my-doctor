import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ILGetStarted, ILLogo } from '../../assets/illustrations';
import { Button, Gap } from '../../components';
import { colors } from '../../utils';
import { fonts } from '../../utils/fonts';


const GetStarted = ({navigation}) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>Konsultasi dengan{"\n"}dokter jadi lebih{"\n"}mudah & fleksibel</Text>
      </View>
      <View>
        <Button text="Get Started" type="Primary" onPress={() => navigation.navigate('Register')}/>
        <Gap height={16} width={0}/>
        <Button text="Sign In" type="Secondary" onPress={() => navigation.replace('Login')}/>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
      fontSize: 28,
      fontStyle: 'normal',
      fontFamily: fonts.primary[600],
      marginTop: 91,
      color: colors.white
  },
});
