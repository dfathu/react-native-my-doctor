import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Gap } from '../..'
import { ILCatdoctor1, ILCatdoctor2, ILCatdoctor3, ILCatdoctor4 } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function DoctorCategory({category,onPress}) {
    const Icon = () => {
        if(category === 'dokter umum') {
            return <ILCatdoctor1 style={styles.illustrations}/>;
        }
        if(category === 'psikiater') {
            return <ILCatdoctor2 style={styles.illustrations}/>;
        }
        if(category === 'dokter obat') {
            return <ILCatdoctor3 style={styles.illustrations}/>;
        }
        if(category === 'dokter anak') {
            return <ILCatdoctor4 style={styles.illustrations}/>;
        }
        return <ILCatdoctor1 style={styles.illustrations}/>;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon />
            <Gap height={28}/>
            <Text style={styles.name}>Saya butuh</Text>
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        padding: 12,
        marginRight: 10,
        backgroundColor: colors.cardight.background,
        width: 100,
        height: 130
    },
    illustrations: {
        width: 46,
        height: 46
    },
    name: {
        fontFamily: fonts.primary[300],
        fontSize: 12,
        color: colors.text.primary
    },
    category: {
        fontFamily: fonts.primary[600],
        fontSize: 12,
        color: colors.text.primary
    }
})
