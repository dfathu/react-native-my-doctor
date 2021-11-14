import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button } from '../..'
import { colors, fonts } from '../../../utils'

export default function InputChat({value,onChangeText, onButtonPress,targetChat}) {
    return (
        <View style={styles.container}>
            <TextInput placeholder={`Tulis Pesan untuk ${targetChat.data.fullName}`} style={styles.input} value={value} onChangeText={onChangeText} />
            <Button type='btn-send' onPress={onButtonPress} disable={value.length < 1}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: colors.white
    },
    input : {
        padding: 14,
        borderRadius: 10,
        backgroundColor: colors.disable,
        flex: 1,
        marginRight: 10,
        fontFamily: fonts.primary.normal,
        fontSize: 14,
        maxHeight: 45
    }
})
