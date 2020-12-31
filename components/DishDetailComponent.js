import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card, Icon, ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

function RenderDish(props){
  
  const dish = props.dish;
  if (dish != null){
    return (
      <Card>
        <Card.Title>{dish.name}</Card.Title>
        <Card.Divider/>
        <Card.Image source={require('./images/uthappizza.png')}>
          <Text style={{marginBottom: 10}}>
            {dish.description}
          </Text>
        </Card.Image>
        <Icon raised reverse
          name={ props.favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
          />
      </Card>
    )
  } else {
    return (<View></View>);
  }
}

function RenderComments(props){
  const comments = props.comments;
  const renderCommentItem = ({item, index}) => {
    return (
    <View key={index} style={{margin: 10}}>
      <Text style={{fontSize:14}}>{item.comment}</Text>
      <Text style={{fontSize:12}}>{item.rating} Stars</Text>
      <Text style={{fontSize:14}}>{'--' + item.author + ', ' + item.date}</Text>
    </View>
  );
  };
  return (
    <Card>
      <Card.Title>Comments</Card.Title>
      <Card.Divider />
      <FlatList 
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
        />
    </Card>
  );
}

class DishDetail extends Component{

  constructor(props){
    super(props);
    this.state= {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: []
    }
  }


  static navigationOptions = {
    title: 'Dish Detail'
  }

  markFavorite(dishId){
    this.setState({favorites: this.state.favorites.concat(dishId)});
  }

  render(){
    // this is a string
    const dishId = this.props.route.params.dishId;
    const dishIdNumber = +dishId;

    return (
      <ScrollView>
        <RenderDish dish={this.state.dishes[dishIdNumber]}
          favorite={this.state.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}  />
        <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
      </ScrollView>
    );
  };
}

export default DishDetail;