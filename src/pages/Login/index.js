import { signInWithEmailAndPassword } from '@firebase/auth';
import { get, ref } from '@firebase/database';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ILLogo } from '../../assets/illustrations';
import { Button, Gap, Input, Link } from '../../components/atoms';
import Fire from '../../config/Fire';
import { colors, fonts, showError, storeData, useForm } from '../../utils';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  // *! state untuk loading tapi sudah diganti dengan redux untuk loading
  // const [loading, setLoading] = useState(false);

  const login = () => {
    // ** clg menampilkan form
    // console.log('form :', form);

    dispatch({
      type: 'SET_LOADING',
      value: true,
    });

    signInWithEmailAndPassword(Fire('auth'), form.email, form.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;

        // **menapilkan data user dari signInwithEmail
        // console.log('data user', user.uid);

        get(ref(Fire('database'), `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              // ** menampilkan hasil get data dari firebase ketika berhasil login
              // console.log(snapshot.val());

              storeData('user', snapshot.val());
              navigation.replace('MainApp');
            } else {
              showError('No data available');
            }
          })
          .catch(error => {
            dispatch({
              type: 'SET_LOADING',
              value: false,
            });
            console.error(error);
          });
        // ...
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(errorMessage);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo style={styles.logo} />
          <Gap height={40} />
          <Text style={styles.text}>Masuk dan mulai berkonsultasi</Text>
          <Gap height={40} />
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link size={12} text="Forgot My Password" />
          <Gap height={40} />
          <Button text="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            size={16}
            text="Create New Account"
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  logo: {
    width: 86,
    height: 75,
  },
  text: {
    maxWidth: 153,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fonts.primary[600],
  },
});
