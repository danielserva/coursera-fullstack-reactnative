import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
  }
}

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    createTwoButtonAlert = () =>
    Alert.alert(
      'Delete favorite?',
      'Are you sure you wish to delete the favorite dish ' + item.name + '?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log(item.name + 'Not Deleted'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
      ]
    );
    
    renderRightAction = (progress, item) => {
      const pressHandler = () => {
        Alert.alert(
          'Delete favorite?',
          'Are you sure you wish to delete the favorite dish ' + item.name + '?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log(item.name + 'Not Deleted'),
              style: 'cancel'
            },
            { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
          ]
        );

      }
      return (
        <RectButton onPress={pressHandler} >
            <Button color='red' title={'Delete'} />
        </RectButton>
      );
    };

    renderRightActions = (progress,item) => {
      return  this.renderRightAction(progress, item)
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            return (
            <Swipeable
              renderRightActions={(progress) => this.renderRightActions(progress, item)}>
              <RectButton>
                <Animatable.View animation="fadeInRightBig" duration={2000}>  
                  <ListItem key={index} bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                      <Avatar source={ {uri: baseUrl + item.image } } />
                      <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                      </ListItem.Content>
                  </ListItem>
                </Animatable.View>
              </RectButton>
            </Swipeable>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);