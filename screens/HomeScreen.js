import React, {useState, useEffect} from 'react';
import { Container, Button, Text } from 'native-base';
import { FlatList, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

/* I copy and pasted the cuisine list component into this screen directly so I can have access to the navigation props.
If I need to make any changes, I can play around with it in the components folder. It's there just in case.*/

//Components for the homescreen
import Search from '../components/SearchBar';
import AddCuisine from '../components/AddCuisine';

//The homescreen is where you will see all the cuisines by default
export default Homescreen = ({navigation}) => {
  const [Cuisines, SetCuisines] = useState([]);
  const CuisineCollection = firebase.firestore().collection('cuisines');

  const DeleteCuisine = (e) => {
    Alert.alert(
      'Delete Cuisine?',
      'You will lose all of your saved restaurants and photos',
      [{
        text:'Cancel',
        style:'cancel'
      },
    {text:'Confirm', onPress:()=>{
      CuisineCollection.doc(e).delete();
    }}]
    )
  }

  useEffect(() => {
    const CuisineList = CuisineCollection.onSnapshot(querySnapshot => {
        const cuisine_array = [];
        querySnapshot.forEach(documentSnapshot => {
            cuisine_array.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
            });
        })
        SetCuisines(cuisine_array);
    });
    return () => CuisineList();
  }, []);

  return (
    <Container>
      <Search></Search>
      <FlatList data={Cuisines} style={{margin: 20}} renderItem={(cuisine) => (
          <Button block info style={{margin: 20}} onPress={() => {navigation.navigate('Restaurants', {itemID: cuisine.item.key, itemName: cuisine.item.name})}}
          onLongPress={() => DeleteCuisine(cuisine.item.key)}>
              <Text>{cuisine.item.name}</Text>
          </Button>
      )}></FlatList>
      <AddCuisine></AddCuisine>
    </Container>
  );
}