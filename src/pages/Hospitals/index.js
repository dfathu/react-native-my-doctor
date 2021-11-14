import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { DummyHospital1,DummyHospital2,DummyHospital3, ILHospitalbac } from '../../assets'
import { Gap, ListHospital } from '../../components'
import { colors, fonts } from '../../utils'

const Hospitals = () => {
    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalbac} style={styles.background}>
                <Text style={styles.title}>Nearby Hospitals</Text>
                <Text style={styles.desc}>3 tersedia</Text>    
            </ImageBackground>
            <View style={styles.content}>
                <Gap height={14} />
                <ListHospital type='Rumah Sakit' name='Citra Bunga Merdeka' alamat='Jln. Surya Sejahtera 20' pic={DummyHospital1}/>
                <ListHospital type='Rumah Sakit Anak' name='Happy Family & Kids' alamat='Jln. Surya Sejahtera 20' pic={DummyHospital2}/>
                <ListHospital type='Rumah Sakit Jiwa' name='Tingkatan Paling Atas' alamat='Jln. Surya Sejahtera 20' pic={DummyHospital3}/>
            </View>
        </View>
    )
}

export default Hospitals

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    background: {
        height:240,
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white
    },
    desc : {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 14,
        fontFamily: fonts.primary[300],
        color: colors.white
    },
    content : {
        marginTop: -30,
        borderRadius: 20,
        backgroundColor: colors.white,
        flex: 1
    }
})
