import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Picker, Body, Title, Text, Button} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {useNavigation} from '@react-navigation/native';

/* I have to use a class component for this because it acts all weird if I use a functional component. I'm not a big
fan of class components because I find the 'this' keyword so annoying. Don't really have a choice atm since
I am getting so many errors trying to implement a functional component. Will try to improve on this once I 
release a mvp. I've tried to keep the javascript consistent. */

/* It isn't ideal but it looks like I gotta list all the cuisines one by one in the picker list. Ideally, I would
like to map over an array with all the cuisines but again, so many errors pop up. */

export default class AddCuisine extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected2: undefined,
            cuisines: []
        }
    }
    onValueChange2(value){
        this.setState({
            selected2: value
        })
    }
    //Load cuisines to state
    componentDidMount(){
        const CuisineCollection = firebase.firestore().collection('cuisines');
        CuisineCollection.onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                this.state.cuisines.push(documentSnapshot.data().name);
            })
        })
    }

    SubmitRestaurant(){
        const CuisineCollection = firebase.firestore().collection('cuisines');
        if (this.state.cuisines.includes(this.state.selected2)){
            alert('Cuisine already exists!');
        } else if (this.state.selected2 == undefined) {
            alert('Please select a cuisine!');
        } else {
            CuisineCollection.add({
                name: this.state.selected2
            }).then(() => {
                this.state.selected2 = undefined;
                alert('Cuisine added!');
            })
        }
    }

    render(){
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Add Cuisine!</Title>
                    </Body>
                </Header>
                    <Form>
                        <Item picker>
                            <Picker
                            mode="dropdown"
                            placeholder="Select your cuisine"
                            placeholderStyle={{color:"#bfc6ea"}}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}>
                                <Picker.Item label="🇯🇵 Japanese" value="🇯🇵 Japanese" />
                                <Picker.Item label="🇰🇷 Korean" value="🇰🇷 Korean" />
                                <Picker.Item label="🇨🇳 Chinese" value="🇨🇳 Chinese" />
                                <Picker.Item label="🇮🇩 Indonesian" value="🇮🇩 Indonesian" />
                                <Picker.Item label="🇭🇰 Hong Kong" value="🇭🇰 Hong Kong" />
                                <Picker.Item label="🇹🇼 Taiwanese" value="🇹🇼 Taiwanese" />
                                <Picker.Item label="🇲🇾 Malaysian" value="🇲🇾 Malaysian" />
                                <Picker.Item label="🇸🇬 Singaporean" value="🇸🇬 Singaporean" />
                                <Picker.Item label="🇹🇭 Thai" value="🇹🇭 Thai" />
                                <Picker.Item label="🇮🇳 Indian" value="🇮🇳 Indian" />
                                <Picker.Item label="🇬🇧 British" value="🇬🇧 British" />
                                <Picker.Item label="🇫🇷 French" value="🇫🇷 French" />
                                <Picker.Item label="🇮🇹 Italian" value="🇮🇹 Italian" />
                                <Picker.Item label="🇺🇸 American" value="🇺🇸 American" />
                                <Picker.Item label="🇩🇪 German" value="🇩🇪 German" />
                            </Picker>
                        </Item>
                    </Form>
                    <Button rounded light onPress={() => this.SubmitRestaurant()} style={{margin: 10}}>
                        <Text>Submit</Text>
                    </Button>
                    
            </Container>
        )
    }
}