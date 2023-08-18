import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './redux/rootReducer';
import axios from 'axios';
import {AddItemsToParking} from './redux/arrayReducer';

type formTypes = {
  navigation: any;
  route: any;
};

function Price({navigation, route}: formTypes): JSX.Element {
  const [hours, setHours] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [registedNumber, setRegistedNumber] = useState('');
  const {index} = route.params;
  const dispatch = useDispatch();
  const parkigArray = useSelector(
    (state: RootState) => state.parkingarray.items,
  );

  const getPrice = () => {
    console.log(
      registedNumber,
      parkigArray[index].registedNumber,
      'registed number',
      parkigArray[index].start
    );
    setRegistedNumber(parkigArray[index].registedNumber);
    const startTime = new Date(parkigArray[index].start);
    const endTime = new Date();
    const timeDifferenceMs: number = endTime.getTime() - startTime.getTime();
    const hoursSpent: number = timeDifferenceMs / (1000 * 3600);
    setHours(hoursSpent);
    const firstTwoHoursPrice = 10;
    const addHoursPrice = 10;

    if (hoursSpent <= 2) {
      setPrice(firstTwoHoursPrice);
    } else {
      setPrice(firstTwoHoursPrice + addHoursPrice * (hoursSpent - 2));
    }
  };

  useEffect(() => {
    if (index) {
      getPrice();
    }
  }, [index]);

  const onPressSubmit = async () => {
    try {
      console.log('registed number presss subit ');
      const response = await axios.get('https://httpstat.us/200');
      if (response.status === 200) {
        const newArr = parkigArray.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              isRegistered: false,
              registedNumber: '',
              start: '',
            };
          }
          return item;
        });
        dispatch(AddItemsToParking(newArr));
        navigation.navigate('parking-slots');
      }
    } catch (e) {
      console.log('something went wrong');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          Vechile details {registedNumber}
        </Text>
        <View style={{borderWidth: 3, backgroundColor: '#fff'}}>
          <Text style={{fontSize: 18, fontFamily: '700'}}>
            Price for the {hours} hours is ${price}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <Button
              title="Pay"
              onPress={onPressSubmit}
              testID='pay-button'
            />
          </View>
          <Button
            title="Cancel"
            testID='backButton'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Price;
