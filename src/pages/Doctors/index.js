import {
  get,
  limitToFirst,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from '@firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import Fire from '../../config/Fire';
import {colors, fonts, showError} from '../../utils';

const Doctors = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDokter, setcategoryDokter] = useState([]);
  const [TopRate, setTopRate] = useState([]);

  useEffect(() => {
    getCategory();
    getNews();
    getTopRatedDoctor();
  }, []);

  // const parseArray = listObject => {
  //   const data = [];
  //   Object.keys(listObject).map(key => {
  //     data.push({
  //       id: key,
  //       data: listObject[key],
  //     });
  //   });
  //   return data;
  // };

  const getCategory = () => {
    get(ref(Fire('database'), 'category_doctor/'))
      .then(res => {
        // console.log('hasil respon get category dokter', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setcategoryDokter(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getTopRatedDoctor = () => {
    const q = query(
      ref(Fire('database'), 'doctors/'),
      orderByChild('rate'),
      limitToFirst(3),
    );

    get(q)
      .then(res => {
        // console.log('hasil respon get list top rate dokter', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];

          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          // console.log('hasil parse Array data Top Rate: ', data);
          setTopRate(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getNews = () => {
    get(ref(Fire('database'), 'news/'))
      .then(res => {
        // console.log('hasil respon get data', res.val());
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(error => {
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={30} />
          <View style={styles.wrapperSection}>
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Gap height={30} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <Gap height={16} />
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {
                  // !sudah tidak dipakai karena contoh dinamis lewat json
                  // JSONCategoryDoctor.data.map(item => {
                  //   return (
                  //     <DoctorCategory
                  //       key={`jsonkey${item.id}`}
                  //       category={item.category}
                  //       onPress={() =>
                  //         navigation.navigate('ChooseDoctor', {
                  //           category: [item.category],
                  //         })
                  //       }
                  //     />
                  //   );
                  // })

                  categoryDokter.map(Catdoc => {
                    return (
                      <DoctorCategory
                        key={`categorydoc_${Catdoc.id}`}
                        category={Catdoc.category}
                        onPress={() =>
                          navigation.navigate('ChooseDoctor', {
                            category: [Catdoc.category],
                          })
                        }
                      />
                    );
                  })
                }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <View>
              {
                TopRate.map(doctor => {
                  return (<RatedDoctor
                  key={`doctor_${doctor.id}`}
                  avatar={{uri : doctor.data.photo}}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  onPress={() => navigation.navigate('DoctorProfile',doctor)}
                />)
                })
              }
            </View>
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <View>
            {news.map(news => {
              return (
                <NewsItem
                  key={`news_${news.id}`}
                  title={news.title}
                  date={news.date}
                  image={news.image}
                />
              );
            })}
          </View>
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: 20,
    width: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
