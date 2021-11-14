import {equalTo, get, orderByChild, query, ref} from '@firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DummyDoctor1} from '../../assets';
import {Header, List} from '../../components';
import Fire from '../../config/Fire';
import {colors, showError} from '../../utils';

export default function ChooseDoctor({route, navigation}) {
  const itemCategory = route.params.category;
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    getDataByCat(itemCategory[0]);
  }, [itemCategory]);

  const getDataByCat = category => {
    console.log(category);
    const q = query(
      ref(Fire('database'), 'doctors/'),
      orderByChild('category'),
      equalTo(category),
    );

    get(q)
      .then(value => {
        if (value.exists()) {
          const oldData = value.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setListDoctor(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={'Pilih ' + itemCategory}
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map(doctor => {
        return (
          <List
          key={doctor.id}
            type="next"
            profile={{uri : doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile',doctor)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
