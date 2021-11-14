import {onAuthStateChanged, updatePassword} from '@firebase/auth';
import { ref, update } from '@firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILPhotoUserNull} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import Fire from '../../config/Fire';
import {colors, getData, storeData} from '../../utils';

export default function UpdateProfile({navigation}) {
  const [form, setForm] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [photo, setPhoto] = useState(ILPhotoUserNull);
  const [photoforDB, setPhotoforDB] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setForm(data);
      console.log('newdata : ', data);
    });
  }, []);

  const onChageText = (key, value) => {
    setForm({...form, [key]: value});
  };

  const updateProfile = () => {
    console.log(form);

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password Kurang Dari 6',
          type: 'default',
          backgroundColor: colors.errorMessage,
          color: colors.white,
        });
      } else {
        onAuthStateChanged(Fire('auth'), user => {
          if (user) {
            updatePasswordUser();
            updateProfileUser();
          }
        });
      }
    } else {
      updateProfileUser();
    }
  };

  const updatePasswordUser = () => {
    updatePassword(Fire('auth').currentUser, password).then(
      () => {
        showMessage({
          message: 'Berhasil Update Data',
          type: 'default',
          backgroundColor: colors.primary,
          color: colors.white,
        });
      }
    ).catch(err => {
      console.log(err.message);
      showMessage({
        message: err.message,
        type: 'default',
        backgroundColor: colors.errorMessage,
        color: colors.white,
      });
    });
  };

  const updateProfileUser = () => {
    const data = form;
    data.photo = photoforDB;
    update(ref(Fire('database'), `users/${form.uid}/`), data)
      .then(() => {
        console.log('success', data);
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.errorMessage,
          color: colors.white,
        });
      });
  };

  const getImage = () => {
    launchImageLibrary(
      {includeBase64: true, maxHeight: 200, maxWidth: 200},
      response => {
        console.log('respons :', response);
        if (response.didCancel || response.errorCode) {
          showMessage({
            message: 'oops, sepertinya anda tidak jadi memilih foto ?',
            type: 'default',
            backgroundColor: colors.errorMessage,
            color: colors.white,
          });
        } else {
          const source = {uri: response.assets[0].uri};
          setPhotoforDB(
            `data: ${response.assets[0].type};base64,${response.assets[0].base64}`,
          );
          setPhoto(source);
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={20} />
        <Profile type photo={photo} onPress={getImage} />
        <Gap height={26} />
        <View style={styles.wrapperScroll}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => {
              onChageText('fullName', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={value => {
              onChageText('profession', value);
            }}
          />
          <Gap height={24} />
          <Input label="Email" value={form.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
            secureTextEntry
          />
          <Gap height={40} />
          <Button text="Save Profile" onPress={updateProfile} />
          <Gap height={48} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapperScroll: {
    paddingHorizontal: 40,
  },
});
