import React from 'react';
import { Container, Text, Content, Card, CardItem, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default RestaurantLocation = () => {
    const Location = [{
        title: 'location render google maps',
        content: 'location'
    }]
    return (
        <Container style={{margin: 5}}>
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Eat Tokyo</Text>
                                <Text note><Icon name="location" size={15} color="red"></Icon>Soho, London, United Kingdom</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}