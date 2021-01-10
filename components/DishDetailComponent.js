import React, { Component } from 'react';
import { View, Text, PanResponder } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators'; 
import { postComment } from '../redux/ActionCreators'; 
import { Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Alert } from 'react-native';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderDish(props){
  
  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
        return true;
    else
        return false;
  }
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
    },
    onPanResponderEnd: (e, gestureState) => {
        console.log("pan responder end", gestureState);
        if (recognizeDrag(gestureState))
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + dish.name + ' to favorite?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                ],
                { cancelable: false }
            );
  
        return true;
    }
  })

  
  if (dish != null){
    return (
      <Animatable.View animation="fadeInDown" duration={1000} delay={500} 
        {...panResponder.panHandlers}>
        <Card>
          <Card.Image style={{padding:0,alignItems: 'center',justifyContent:'center'}} source={ {uri: baseUrl + dish.image } }>
            <Text style={{margin:10, color:'white'}}>
              {dish.name}
            </Text>
          </Card.Image>
          <Text style={{marginBottom: 10}}>
              {dish.description}
            </Text>
          <View style={styles.formRow}>
          <Icon raised reverse
            name={ props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
            />
          <Icon raised reverse
            name={'pencil'}
            type='font-awesome'
            color='#512DA8'
            onPress={() => props.toggleModal()}
            />
          </View>
        </Card>
      </Animatable.View>
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

  constructor(props) {
    super(props);

    this.state = {
        rating: 3,
        author: '',
        comment: '',
        showModal: false
    }
}

  static navigationOptions = {
    title: 'Dish Detail'
  }

  markFavorite(dishId){
    this.props.postFavorite(dishId); 
  }

  addComment(dishId, rating, author, comment){
    console.log('rating: ' + rating);
    this.props.postComment(dishId, rating, author, comment);
  }

  toggleModal() {
    this.setState({showModal: this.state.showModal ? false : true });
  }

  resetForm(){
    this.setState({
      rating: 0,
      author: '',
      comment: ''
    });
  }

  render(){
    // this is a string
    const dishId = this.props.route.params.dishId;
    const dishIdNumber = +dishId;

    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[dishIdNumber]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)} 
          toggleModal={() => this.toggleModal()} />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {this.toggleModal(); this.resetForm();}}
          onRequestClose={() => {this.toggleModal(); this.resetForm();}}
          >
          <View style = {styles.modal}>
            <Rating
              startingValue={3}
              value={this.state.rating}
              showRating
              onFinishRating={dishRating => this.setState({rating: dishRating})}
              style={{ paddingVertical: 10 }}
              />
            <Input
              placeholder="Author"
              leftIcon={{ type: 'font-awesome', name: 'user-o'}}
              onChangeText={value => this.setState({ author: value })}
              />
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              onChangeText={value => this.setState({ comment: value })}
              />
            <Button 
              onPress = {() =>{this.toggleModal(); this.addComment(dishId, this.state.rating, this.state.author, this.state.comment); this.resetForm();}}
              color="#512DA8"
              title="Submit" 
              />
            <Button 
                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                color="grey"
                title="Cancel" 
                />
          </View>
        </Modal>
      </ScrollView>
    );
  };
  
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
      fontSize: 18,
      flex: 2
  },
  formItem: {
      flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);