import React, {useState, useEffect} from 'react';
import { Button, Text } from 'native-base';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import 'firebase/firestore';

const CuisineList = () => {
    const navigation = useNavigation();
    const [Cuisines, SetCuisines] = useState([]);
    const CuisineCollection = firebase.firestore().collection('cuisines');

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
        <FlatList data={Cuisines} style={{margin: 20}} renderItem={(cuisine) => (
            <Button block info style={{margin: 20}} onPress={() => navigation.navigate('Restaurants')}>
                <Text>{cuisine.item.name}</Text>
            </Button>
        )}></FlatList>
    )
}

export default CuisineList;