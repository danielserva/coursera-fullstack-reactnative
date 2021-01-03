import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators'; 

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
})


function RenderDish(props){
  
  const dish = props.dish;
  if (dish != null){
    return (
      <Card>
        <Card.Image style={{padding:0,alignItems: 'center',justifyContent:'center'}} source={ {uri: baseUrl + dish.image } }>
          <Text style={{margin:10, color:'white'}}>
            {dish.name}
          </Text>
        </Card.Image>
        <Text style={{marginBottom: 10}}>
            {dish.description}
          </Text>
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

  static navigationOptions = {
    title: 'Dish Detail'
  }

  markFavorite(dishId){
    this.props.postFavorite(dishId); 
  }

  render(){
    // this is a string
    const dishId = this.props.route.params.dishId;
    const dishIdNumber = +dishId;

    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[dishIdNumber]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}  />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
      </ScrollView>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);