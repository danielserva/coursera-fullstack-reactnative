import React, { Component } from 'react';
import Constants from 'expo-constants';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import { Button, View, Platform } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator() {
  return (
    <Stack.Navigator initialRoutName='Menu'>
      <Stack.Screen name="Menu" component={Menu} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
      <Stack.Screen name="Dishdetail" component={DishDetail} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}/>
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  );
}

function AboutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={About} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  );
}

function ContactNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Contact} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  );
}


function MainNavigator() {
  return(
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="About Us" component={AboutNavigator} />
      <Drawer.Screen name="Menu" component={MenuNavigator} />
      <Drawer.Screen name="Contact Us" component={ContactNavigator} />
    </Drawer.Navigator>
  )
}

class Main extends Component {

  render() {
 
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
  
export default Main;