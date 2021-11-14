import { child, get, onValue, ref } from '@firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gap, List } from '../../components';
import Fire from '../../config/Fire';
import { colors, fonts, getData } from '../../utils';

const Messages = ({navigation,route}) => {
    const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  const getDataUserFromLocal = () => {
    getData('user').then(value => {
      setUser(value);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    onValue(ref(Fire('database'), urlHistory),async snapshot => {
      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const dbRef = ref(Fire('database'));
          const detailDoctor = await get(child(dbRef,urlUidDoctor));
          data.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key],
          });
        });

        await Promise.all(promises);
        // console.log('new data history', data);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <Gap height={16} />
        {historyChat.map(chat => {
          // console.log('test isi chat', chat);
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri : chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress = {() => navigation.navigate('ChattingDoctor', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    marginTop: 30,
    marginLeft: 16,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.primary,
  },
});
