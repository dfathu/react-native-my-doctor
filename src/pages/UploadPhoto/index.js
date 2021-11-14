import {ref, update} from '@firebase/database';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {IconBtnAddPhoto, IconBtnRemovePhoto} from '../../assets/icons';
import {ILPhotoUserNull} from '../../assets/illustrations';
import {Button, Gap, Header, Link} from '../../components';
import Fire from '../../config/Fire';
import {colors, fonts, storeData} from '../../utils';

export default function UploadPhoto({navigation, route}) {
  const {fullName, profession, uid} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILPhotoUserNull);
  const [photoforDB, setPhotoforDB] = useState('');
  const getImage = () => {
    launchImageLibrary({includeBase64: true,maxHeight: 200, maxWidth: 200}, response => {
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
        setHasPhoto(true);
      }
    });
  };

  const UploadandContinue = () => {
    // newPostkey adalah fungsi generate new key
    // const newPostKey = push(child(ref(Fire('database')), 'users/')).key;
    const data = route.params;
    data.photo = photoforDB;
    update(ref(Fire('database'), 'users/' + uid), {photo: photoforDB});
    storeData('user',data);
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatar_Wrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconBtnRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconBtnAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profesi}>{profession}</Text>
        </View>
        <View>
          <Button
            text="Upload and Continue"
            onPress={UploadandContinue}
            disable={!hasPhoto}
          />
          <Gap height={30} />
          <Link
            text="Skip for this"
            size={16}
            align="center"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 80,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatar_Wrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border.satu,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  profesi: {
    fontSize: 18,
    fontFamily: fonts.primary['normal'],
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'capitalize'
  },
});
