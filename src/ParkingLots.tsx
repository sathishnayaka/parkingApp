import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './redux/rootReducer';
import {parkingData} from './redux/arrayReducer';

type formTypes = {
  navigation: any;
  route: any;
};

function ParkingSlots({navigation, route}: formTypes): JSX.Element {
  const parkigArray = useSelector(
    (state: RootState) => state.parkingarray.items,
  );
  const onPressofParkingSlot = (index: number) => {

    navigation.navigate('vechile-registration', {
      index
   });
  };

  const onPressPriceCaluclate = (index:number) =>{
    navigation.navigate('Price-details', {index})
  }
  
  return (
    <SafeAreaView>
      <Button title="Select Random parking Area" />
      <ScrollView>
        <View style={styles.sectionContainer}>
          {parkigArray.map((ele: parkingData, index: number) => {
            if(!ele.isRegistered){
              return (
                <TouchableOpacity key={index} onPress={() => onPressofParkingSlot(index)} testID={`parkingPress${index}`}>
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'lightgreen',
                      margin: 10,
                      padding: 10,
                    }}>
                    <Text style={{fontSize: 20, fontWeight: '700'}}>
                      Parking Area
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Slot Number: {index}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }else{
              return(
                <TouchableOpacity key={index} onPress={() => onPressPriceCaluclate(index)} testID={`pricepress${index}`}>
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'lightgreen',
                      margin: 10,
                      padding: 10,
                    }}>
                    <Text style={{fontSize: 20, fontWeight: '700'}}>
                      Parking Area
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Registration Number: {ele.registedNumber}
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Parking area Slot Number is {index}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </View>
      </ScrollView>
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

export default ParkingSlots;
