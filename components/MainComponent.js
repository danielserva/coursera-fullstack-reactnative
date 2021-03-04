import React, { Component } from 'react';
import Constants from 'expo-constants';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
// import Example from './ExampleComponent';
import { View, Platform, ToastAndroid } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchLeaders, fetchComments, fetchPromos, fetchDishes } from '../redux/ActionCreators';
import NetInfo from "@react-native-community/netinfo";
const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),  
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator() {
  return (
    <Stack.Navigator initialRoutName='Menu'
      screenOptions={({navigation}) => ( {
        headerLeft: () => <Icon name='menu' size={24}
          color='white'
          onPress={() => navigation.toggleDrawer() }/>
      })}>
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
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
    })}>
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
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
    })}>
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
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
    })}>
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

function ReservationNavigator(){
  return (
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
      })} >
        <Stack.Screen name="Reservation" component={Reservation} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  )
}

function FavoritesNavigator(){
  return (
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
      })} >
        <Stack.Screen name="Favorites" component={Favorites} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  )
}

function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={({navigation}) => ( {
      headerLeft: () => <Icon name='menu' size={24}
        color='white'
        onPress={() => navigation.toggleDrawer() }/>
      })} >
        <Stack.Screen name="Login" component={Login} 
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#512DA8' },
          headerTitleStyle: {
            color: "#fff"            
          }
        }}
        />
    </Stack.Navigator>
  )
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

function MainNavigator() {
  return(
    <Drawer.Navigator initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#D1C4E9'
        }}
        drawerContent={CustomDrawerContentComponent}
    >
      <Drawer.Screen name="Login" component={LoginNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
      <Drawer.Screen name="Home" component={HomeNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
      <Drawer.Screen name="About Us" component={AboutNavigator}
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
      <Drawer.Screen name="Menu" component={MenuNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
      <Drawer.Screen name="Contact Us" component={ContactNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
      <Drawer.Screen name="Reserve Table" component={ReservationNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
        <Drawer.Screen name="Favorites" component={FavoritesNavigator} 
        options={{ 
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'            
              size={24}
              color={tintColor}
              />
          )}
        }/>
    </Drawer.Navigator>
  )
}

  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

class Main extends Component {

  componentDidMount() {
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    NetInfo.fetch().then(connectionInfo => {
      ToastAndroid.show('Initial Network Connectivity Type: '
      + connectionInfo.type 
      + ', effectiveType: ' + connectionInfo.details
      + ', is connected? ' + connectionInfo.isConnected,
      ToastAndroid.LONG)
      });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount(){
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  

  render() {
 
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(null, mapDispatchToProps)(Main);