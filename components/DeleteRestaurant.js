import React from 'react';
import { Button, Text } from 'native-base';

export default DeleteRestaurant = () => {
    return (
        <Button block danger style={{margin: 20}}>
            <Text>Delete Restaurant</Text>
        </Button>
    )
}