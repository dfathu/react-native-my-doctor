import { signOut } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { ILPhotoUserNull } from '../../assets'
import { Gap, Header, List, Profile } from '../../components'
import Fire from '../../config/Fire'
import { colors, getData } from '../../utils'

export default function UserProfile({navigation}) {
    const [profile, setProfile] = useState({
        fullName : '',
        profession: '',
        photo: ILPhotoUserNull,
    });

    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            data.photo = {uri : res.photo};
            setProfile(data);
        });
    }, []);

    const signOutUser = () => {
        signOut(Fire('auth')).then(() => {
            // Sign-out successful.
            console.log('Berhasil Sign Out');
            navigation.replace('Get Started');
          }).catch((error) => {
            // An error happened.
            showMessage({
                message: error.message,
                type: 'default',
                backgroundColor: colors.errorMessage,
                color: colors.white,
              });
          });
    }; 

    return (
        <View style={styles.page}>
            <Header title='Profile' onPress={() => navigation.goBack()}/>
            <Gap height={10} />
            {profile.fullName.length > 0 && <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo}/>}
            <Gap height={30} />
            <List name='Edit Profile' desc='Last updated yesterday' type='next' icon='edit-profile' onPress={() => navigation.navigate('UpdateProfile')}/>
            <List name='Language' desc='Available 12 languages' type='next' icon='language'/>
            <List name='Give Us Rate' desc='On Google Play Store' type='next' icon='rate'/>
            <List name='Sign Out' desc='Read our guidelines' type='next' icon='help' onPress={signOutUser}/>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})
