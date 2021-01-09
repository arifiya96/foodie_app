import React from 'react';
import { Image, FlatList, View, Text } from 'react-native';

export default FoodList = () => {
    const food_array = [{
        name: 'Sushi',
        url: 'https://i.ytimg.com/vi/xLV1ZHEAaS0/maxresdefault.jpg',
        key: '234324'
    },{
        name: 'Kara Age',
        url: 'https://asianinspirations.com.au/wp-content/uploads/2018/07/R00639_Chicken-Karaage.jpg',
        key: '23423434'
    }];
    return (
        <View>
            <FlatList data={food_array} 
            horizontal={true}
            renderItem={(food) => (
                <View>
                    <Image source={{uri: food.item.url}} style={{width: 300, height: 300, borderRadius: 5, margin: 10}}></Image>
                </View>
            )}></FlatList>
        </View>
    )
}