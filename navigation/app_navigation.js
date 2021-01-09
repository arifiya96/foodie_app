import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens for navigation
import Homescreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import FoodScreen from '../screens/FoodScreen';
import AddCuisine from '../screens/AddCuisineScreen';
import AddRestaurantScreen from '../screens/AddRestaurantScreen';

//Remember that the AddCuisine component is a class component and not a functional one
export default AppNavigator = () => {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="Home" component={Homescreen}></Stack.Screen>
                <Stack.Screen name="Restaurants" component={RestaurantScreen}></Stack.Screen>
                <Stack.Screen name="Foods" component={FoodScreen}></Stack.Screen>
                <Stack.Screen name="Add_Cuisine" component={AddCuisine}></Stack.Screen>
                <Stack.Screen name="Add_Restaurant" component={AddRestaurantScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}