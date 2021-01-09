import React from 'react';
import { Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default AddCuisine = () => {
    const navigation = useNavigation();
    return (
        <Button block light style={{margin: 20}} onPress={() => navigation.navigate('Add_Cuisine')}>
            <Text>Add Cuisine</Text>
        </Button>
    )
}