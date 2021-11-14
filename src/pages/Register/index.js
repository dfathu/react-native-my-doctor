import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Gap, Header, Input } from '../../components';
import Fire from '../../config/Fire';
import { colors, showError, storeData, useForm } from '../../utils';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  // ? sudah diganti dispatch const [loading, setLoading] = useState(false);

  const onContinue = () => {
    // * set loading
    // ? sudah diganti before : setLoading(true);
    // ? after : 
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });

    // ** clg menampilkan hasil set Form 
    // console.log(form);

    createUserWithEmailAndPassword(Fire('auth'), form.email, form.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: user.uid
        };
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        setForm('reset');
        // save to firebase
        set(ref(Fire('database'), 'users/' + user.uid), data);
        // save data to local storage
        storeData('users', data);
        // ** clg menampilkan hasil success register 
        // console.log('register success : ', user);

        // ** navigation
        navigation.navigate('UploadPhoto', data);
        // ...
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;

        // ** clg Menampilkan error 
        // console.log('register error : ', errorMessage);

        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(errorMessage);
        // ..
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={40} />
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
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
            <Gap height={40} />
            <Button text="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 40,
    paddingTop: 0,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
  },
});
