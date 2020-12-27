import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

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
      </Card>
    )
  } else {
    return (<View></View>);
  }
}

class DishDetail extends Component{

  constructor(props){
    super(props);
    this.state= {
      dishes: DISHES
    }
  }


  static navigationOptions = {
    title: 'Dish Detail'
  }

  render(){
    // this is a string
    const dishId = this.props.route.params.dishId;
    const dishIdNumber = +dishId;

    return (<RenderDish dish={this.state.dishes.filter((dish) => dish.id === dishIdNumber)[0]} />);
  }

}

export default DishDetail;