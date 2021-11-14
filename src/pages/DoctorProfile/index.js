import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors} from '../../utils';

export default function DoctorProfile({navigation,route}) {
  const dataDoctor = route.params;

  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress= {() => navigation.goBack()}/>
      <Gap height={10} />
      <Profile gender={dataDoctor.data.gender} name={dataDoctor.data.fullName} desc={dataDoctor.data.profession} photo={{uri: dataDoctor.data.photo}} />
      <ProfileItem label="Alumnus" value={dataDoctor.data.university}/>
      <ProfileItem label="Tempat Praktik" value={dataDoctor.data.hospital_address} />
      <ProfileItem label="No. STR" value={dataDoctor.data.str_number} />
      <View style={styles.wrapperButton}>
        <Button text="Start Consultation" onPress={() => navigation.navigate('ChattingDoctor',dataDoctor)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  wrapperButton : {
      padding: 40,
      paddingTop: 23,
  }
});
