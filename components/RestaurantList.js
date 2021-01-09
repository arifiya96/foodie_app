import React from 'react';
import { Card, CardItem, Text, Left, Body } from 'native-base';
import { Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default RestaurantList = () => {
    const navigation = useNavigation();
    const Test_Restaurants = [
        {
            name: 'Eat Tokyo',
            url: 'http://media-cdn.tripadvisor.com/media/photo-s/05/2a/52/8c/eat-tokyo.jpg',
            key: '213131'
        },
        {
            name: 'Aburi',
            url: 'https://threebestrated.co.uk/images/AburiJapaneseRestaurant-Colchester-UK.jpeg',
            key: '493293'
        }
    ]
    return (
            <FlatList data={Test_Restaurants} style={{margin: 20}} numColumns={2} renderItem={(restaurant) => (
                <Card style={{width: '50%'}}>
                    <CardItem cardBody button onPress={() => navigation.navigate('Foods')}>
                        <Image source={{uri: null}} style={{height: 200, width: null, flex: 1}}></Image>
                    </CardItem>
                    <CardItem button onPress={() => navigation.navigate('Foods')}>
                        <Left>
                            <Body>
                                <Text>{restaurant.item.name}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )}></FlatList>
    )
}