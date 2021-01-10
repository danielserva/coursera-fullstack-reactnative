import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

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

    renderLeftAction = (progress, itemId) => {
      const pressHandler = () => {
        console.log('pressHandler itemId: ' + itemId)
        this.props.deleteFavorite(itemId);

      }
      return (
        <RectButton onPress={pressHandler} >
          <Text
            size={30}
            color="#fff"> renderLeftAction </Text>
        </RectButton>
      );
    };

    renderLeftActions = (progress,itemId) => {
      return  this.renderLeftAction(progress, itemId)
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            return (
            <Swipeable
              renderLeftActions={(progress) => this.renderLeftActions(progress, item.id)}>
              <RectButton>
                <ListItem key={index} bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                    <Avatar source={ {uri: baseUrl + item.image } } />
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
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