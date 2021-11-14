import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

export default function ProfileItem({label,value}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 16,
        borderBottomColor: colors.border.satu,
        borderBottomWidth: 1
    },
    label : {
        color: colors.text.secondary,
        fontFamily: fonts.primary.normal,
        fontSize: 14
    },
    value : {
        color: colors.text.primary,
        fontFamily: fonts.primary.normal,
        fontSize: 14
    }
})
