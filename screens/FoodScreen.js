import React, {useEffect, useState} from 'react';
import { Container, Content, Card, CardItem, Left, Body, Text } from 'native-base';
import { FlatList, View, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

//Components for the foods
import Search from '../components/SearchBar';

/* I copy and pasted the food list component + restaurant location component into this screen directly 
so I can have access to the route.params props. If I need to make any changes, I can play around with it in 
the components folder. It's there just in case.*/

export default FoodScreen = ({route}) => {
    const {restaurantID, itemID} = route.params;
    const [Restaurant, SetRestaurant] = useState(null);
    const [loading, SetLoading] = useState(true);
    const CuisineCollection = firebase.firestore().collection('cuisines');
    const [image, SetImage] = useState(null);

    useEffect(() => {
        (async ()=> {
            if (Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted'){
                    alert('Sorry, we need camera roll permissions to make this work');
                }
            }
            CuisineCollection.doc(itemID).collection('restaurants').doc(restaurantID).onSnapshot(documentSnapshot => {
                const restaurant_obj = {
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                }
                SetRestaurant(restaurant_obj);
                SetLoading(false);
            })
        })();
    },[]);

    const AddImage = async () => {
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

    const UploadImage = () => {
        CuisineCollection.doc(itemID).collection('restaurants').doc(restaurantID).update({
            images: firebase.firestore.FieldValue.arrayUnion(image)
        }).then(() => {
            alert('Image added');
            SetImage(null);
        })
    }

    if(loading){
        return <ActivityIndicator></ActivityIndicator>
    } 

    return (
        <Container>
            <Search></Search>
            <FlatList data={Restaurant.images} style={{maxHeight: 200}}
            horizontal={true}
            keyExtractor={(item, index) => item.key}
            renderItem={(food) => (
                <View key={food.key}>
                    <Image source={{uri: food.item}} style={{width: 200, height: 200, borderRadius: 5, margin: 10}}></Image>
                </View>
            )}></FlatList> 
            <Container style={{margin: 5}}>
                <Content>
                    <Text note style={{margin:5}} onPress={() => AddImage()}><Icon name="add" size={15}></Icon>Add Image</Text>
                    <View style={{margin: 5}}>
                        {image && 
                        <View>
                            <Image source={{uri: image}} style={{width: 200, height: 200}}></Image>
                            <Text note style={{margin:5}} onPress={() => UploadImage()}>Click here to confirm</Text>
                        </View>
                        }
                    </View>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{Restaurant.name}</Text>
                                    <Text note><Icon name="location" size={15} color="red"></Icon>{Restaurant.city}, {Restaurant.country}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <MapView initialRegion={{
                            latitude: Restaurant.location.lat,
                            longitude: Restaurant.location.lng,
                            latitudeDelta: 0.0006866,
                            longitudeDelta: 0.0004757
                        }} style={{
                            width: 380,
                            height: 250
                        }}>
                            <Marker coordinate={{latitude: Restaurant.location.lat, longitude: Restaurant.location.lng}}>
                            </Marker>
                    </MapView>
                </Content>
            </Container>
        </Container>
    )
}

