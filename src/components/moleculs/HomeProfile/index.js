import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Gap } from '../..'
import { DummyUser } from '../../../assets'
import { colors, fonts, getData } from '../../../utils'


export default function HomeProfile({onPress}) {
    const [profile, setProfile] = useState({
        photo : DummyUser,
        fullName : '',
        profession: '',
    });

    useEffect(() => {
        getData('user').then(res => {
          const data = res;
          data.photo = {uri : res.photo};
          console.log('new data user :', data);
          setProfile(data);
        });  
      }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.avatar} source={profile.photo} />
            <Gap width={12} />
            <View style={styles.content}>
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.profession}>{profile.profession}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {flexDirection: 'row'},
    avatar: {
        height: 46,
        width: 46,
        borderRadius: 46/2,
    },
    content: {
        justifyContent: 'center',
    },
    name: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.primary,
        textTransform: 'capitalize'
    },
    profession : {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: colors.text.secondary,
        textTransform: 'capitalize'
    }
})
