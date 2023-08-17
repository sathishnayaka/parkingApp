import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AddItemsToParking, parkingData } from './redux/arrayReducer';

type formTypes = {
  navigation: any;
};

function Home({navigation}: formTypes): JSX.Element {
  const [slots, setSlots]= useState('');
  const dispatch = useDispatch();
  const onPressSubmit = () => {
    const object = {
      isRegistered: false,
      registedNumber: "",
      start: "",
      end: "",
    }
    const noSlots = parseInt(slots);
    const  arr:parkingData[] = [];
    for(let i=0;i<noSlots;i++){
      arr.push(object);
    }
    dispatch(AddItemsToParking(arr));
    navigation.navigate('parking-slots', {
       slots
    });
  };

  const onChangeText = (val: string) => {
    setSlots(val);
  };

  return (
    <SafeAreaView >
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={slots}
          placeholder="Please enter number of parking lots"
          testID="text-input"
          keyboardType='number-pad'
        />
        <Button
          title="submit"
          disabled={slots === '' ? true : false}
          onPress={onPressSubmit}
          testID="submit-button"
        />
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

export default Home;
