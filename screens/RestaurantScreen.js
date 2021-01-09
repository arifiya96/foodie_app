import React, {useState, useEffect} from 'react';
import { Container, Card, CardItem, Text, Left, Body, Button } from 'native-base';
import { Image, FlatList, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

/* I copy and pasted the restaurant list component into this screen directly so I can have access to the navigation props.
If I need to make any changes, I can play around with it in the components folder. It's there just in case.*/

//Components for the restaurants
import Search from '../components/SearchBar';

export default RestaurantScreen = ({navigation, route}) => {
    //itemID is the cuisine id
    const {itemID} = route.params;
    const [Restaurants, SetRestaurants] = useState([]);
    const CuisineCollection = firebase.firestore().collection('cuisines');

    const DeleteRestaurant = (e) => {
        Alert.alert(
            'Delete Restaurant?',
            'You will lose all of your saved photos',
            [{
              text:'Cancel',
              style:'cancel'
            },
          {text:'Confirm', onPress:()=>{
            CuisineCollection.doc(itemID).collection('restaurants').doc(e).delete();
          }}]
          )
    }

    useEffect(() => {
        const GetRestaurants = CuisineCollection.doc(itemID).collection('restaurants').onSnapshot(querySnapshot => {
            const restaurants_array = [];
            querySnapshot.forEach(docmentSnapshot => {
                restaurants_array.push({
                    ...docmentSnapshot.data(),
                    key: docmentSnapshot.id
                });
            })
            SetRestaurants(restaurants_array);
        });
        return () => GetRestaurants();
    }, []);

    return (
        <Container>
            <Search></Search>
            <FlatList data={Restaurants} style={{margin: 20}} numColumns={2} renderItem={(restaurant) => (
                <Card style={{width: '50%'}}>
                    <CardItem cardBody button onPress={() => navigation.navigate('Foods', {restaurantID: restaurant.item.key, itemID})}
                    onLongPress={() => DeleteRestaurant(restaurant.item.key)}>
                        <Image source={{uri: restaurant.item.images[0]}} style={{height: 200, width: null, flex: 1}}></Image>
                    </CardItem>
                    <CardItem button onPress={() => navigation.navigate('Foods', {restaurantID: restaurant.item.key, itemID})}
                    onLongPress={() => DeleteRestaurant(restaurant.item.key)}>
                        <Left>
                            <Body>
                                <Text>{restaurant.item.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )}></FlatList>
            <Button block light style={{margin: 20}} onPress={() => navigation.navigate('Add_Restaurant', {itemID})}>
                <Text>Add Restaurant</Text>
            </Button>
        </Container>
    )
}