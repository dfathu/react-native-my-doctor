import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function NewsItem({title,date,image}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={{uri : image}} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        paddingBottom: 16,
        paddingTop: 12,
        paddingHorizontal: 16
        // justifyContent: 'space-between',
    },
    titleWrapper : {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        maxWidth: '90%',
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.primary,
    },
    date: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: colors.text.secondary,
    },
    image: {
        width: 80,
        height: 60,
        borderRadius: 11, 
    }
});
