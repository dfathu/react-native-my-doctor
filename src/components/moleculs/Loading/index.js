import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

export default function Loading() {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size={'large'} color={colors.primary} />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.loadingBackground,
        height: '100%',
        width: '100%'
    },
    text : {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.primary,
        marginTop: 10
    }
})
