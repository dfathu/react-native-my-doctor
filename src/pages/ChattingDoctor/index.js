import React, {useEffect, useState} from 'react';
import {get, onValue, push, ref, set} from '@firebase/database';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../components';
import {
  colors,
  fonts,
  getData,
  showError,
  getChatTime,
  setDateChat,
} from '../../utils';
import Fire from '../../config/Fire';

export default function ChattingDoctor({navigation, route}) {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  const getDataUserFromLocal = () => {
    getData('user').then(value => {
      setUser(value);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebaseChat = `chatting/${chatId}/allchat/`;

    onValue(ref(Fire('database'), urlFirebaseChat), snapshot => {
      console.log('test urlfirebaseChat', urlFirebaseChat);
      if (snapshot.exists()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];

        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key];
          const newDataChat = [];

          Object.keys(dataChat).map(itemchat => {
            newDataChat.push({
              id: itemchat,
              data: dataChat[itemchat],
            });
          });

          allDataChat.push({
            id: key,
            data: newDataChat,
          });
        });
        setChatData(allDataChat);
        console.log('show all data chat : ', chatData);
      } 
    });
  }, [dataDoctor.data.uid, user.uid]);

  const chatSend = () => {
    const today = new Date();
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatId}/allchat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${chatId}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatId}`;

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const dataHistoryChatForUser = {
      lastContentChat : chatContent,
      lastChatDate : today.getTime(),
      uidPartner : dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat : chatContent,
      lastChatDate : today.getTime(),
      uidPartner : user.uid,
    };

    push(ref(Fire('database'), urlFirebase), data)
      .then(res => {
        console.log('lihat isi data', data);
        setChatContent('');
        // set history for user
        set(ref(Fire('database'), urlMessageUser), dataHistoryChatForUser);
        // set history for doctor
        set(ref(Fire('database'), urlMessageDoctor), dataHistoryChatForDoctor);
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        photo={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatdate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const type = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      type={type}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={type ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        targetChat={dataDoctor}
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {flex: 1},
  chatdate: {
    fontFamily: fonts.primary.normal,
    fontSize: 11,
    color: colors.text.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },
});
