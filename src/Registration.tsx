import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { AddItemsToParking } from './redux/arrayReducer';

type formTypes = {
  navigation: any;
  route:any;
};

function Registration({navigation,route}: formTypes): JSX.Element {
  const [vehicleNumber, setVehicleNumber]= useState('');
  const {index} = route.params;
  const dispatch = useDispatch();
  const parkigArray = useSelector(
    (state: RootState) => state.parkingarray.items,
  );

  const onChangeText = (val: string) => {
    setVehicleNumber(val);
  };

  const handleRegistration = () =>{
    const getDate = new Date();
    const newArr = parkigArray.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isRegistered: true,
          registedNumber: vehicleNumber,
          start: getDate.toISOString(),
        };
      }
      return item;
    });
    dispatch(AddItemsToParking(newArr));
    navigation.navigate('parking-slots')
  }

  return (
    <SafeAreaView >
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={vehicleNumber}
          placeholder="Please enter vechile registration number"
          testID="text-input"
        />
        <Button
          title="register"
          onPress={handleRegistration}
          disabled={vehicleNumber === '' ? true : false}
        //   onPress={onPressSubmit}
          testID="register-button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignContent:'center',
    justifyContent:'center'
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

export default Registration;
