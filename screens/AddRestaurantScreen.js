import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Body, Title, Text, Button } from 'native-base';
import { Platform, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import 'firebase/firestore';
import key from '../api_keys/google_key';

export default AddRestaurantScreen = ({route}) => {
    const [restaurant_name, SetRestaurantName] = useState(null);
    const [location, SetLocation] = useState(null);
    const [image, SetImage] = useState(null);
    const {itemID} = route.params;
    const CuisineCollection = firebase.firestore().collection('cuisines');
    const [city, SetCity] = useState(null);
    const [country, SetCountry] = useState(null);

    //Local state to check if restaurant already exists
    const [restaurants, Setrestaurants] = useState([]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted'){
                    alert('Sorry, we need camera roll permissions to make this work');
                }
            }
            CuisineCollection.doc(itemID).collection('restaurants').onSnapshot(querySnapshot => {
                const restaurants_array = [];
                querySnapshot.forEach(documentSnapshot => {
                    restaurants_array.push(documentSnapshot.get('name'));
                })
                Setrestaurants(restaurants_array);
            })
        })();
    },[]);

    const ChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        
        if (!result.cancelled){
            SetImage(result.uri);
        }
    };

    const UploadRestaurant = () => {
        if (restaurant_name == null || location == null ){
            alert('Please select a restaurant!')
        } else if (restaurants.includes(restaurant_name)){
            alert('Restaurant already exists!')
        } else if (image == null){
            alert('Please select an image!')
        } else {
            CuisineCollection.doc(itemID).collection('restaurants').add({
                name: restaurant_name,
                location: location,
                images: [image],
                city: city,
                country: country
            }).then(() => {
                alert('Restaurant added!');
                SetRestaurantName(null);
                SetLocation(null);
                SetImage(null);
            })
        }
    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Add Restaurant!</Title>
                </Body>
            </Header>
            <Content>
                <GooglePlacesAutocomplete 
                fetchDetails={true}
                styles={{
                    textInput: {
                        margin: 20
                    }
                }}
                placeholder="Search restaurant"
                onPress={(data, details = true) => {
                    SetRestaurantName(data.structured_formatting.main_text);
                    SetLocation(details.geometry.location);
                    SetCity(details.address_components[3].long_name);
                    SetCountry(details.address_components[5].long_name);
                }}
                query={{
                    key: key,
                    language: 'en'
                }}>
                </GooglePlacesAutocomplete>
                <Button primary style={{margin: 20}} onPress={() => ChooseImage()}>
                    <Text>Select Profile Pic for Restaurant</Text>
                </Button>
                <View>
                    {image && <Image source={{uri: image}} style={{width: 200, height: 200}}></Image>}
                </View>
                <Button primary style={{margin: 20}} onPress={() => UploadRestaurant()}>
                    <Text>Add Restaurant</Text>
                </Button>
            </Content>
        </Container>
    )
}