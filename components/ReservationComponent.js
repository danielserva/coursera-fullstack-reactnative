import React, { Component, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(1598051730000),
            showModal: false,
            showCalendar: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
      this.setState({showModal: this.state.showModal ? false : true })
    }

    handleReservation() {
      console.log(JSON.stringify(this.state));
      // this.toggleModal();  
      // this.showAlert();
      this.addReservationToCalendar(this.state.date);
    }

    async obtainCalendarPermission() {
      let permission = await Calendar.getCalendarPermissionsAsync();
      if (permission.status !== 'granted') {
          permission = await Calendar.requestCalendarPermissionsAsync();
          if (permission.status !== 'granted') {
              Alert.alert('Permission not granted to add event to calendar');
          }
      }
      return permission;
    }

    async getDefaultCalendarSource() {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
      return defaultCalendars[0].source;
    }

    async getCourseraCalendarId() {
      const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Coursera Calendar' };
      const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Coursera Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'courseraCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      console.log(`Your new calendar ID is: ${newCalendarID}`);
      return newCalendarID;
    }

    async addReservationToCalendar(reservationDate) {
      await this.obtainCalendarPermission();
      let reservationStartDate = new Date(Date.parse(reservationDate));
      let twoHoursLater = Date.parse(reservationDate) + (2*60*60*1000);
      let reservationEndDate = new Date(twoHoursLater);
      
      console.log(JSON.stringify(`reservationDate: ${reservationDate}`));
      console.log(JSON.stringify(`reservationEndDate: ${reservationEndDate}`));
      
      const courseraCalendarId = await this.getCourseraCalendarId(); 
      console.log(JSON.stringify(`courseraCalendarId: ${courseraCalendarId}`));
      const newReservation = await Calendar.createEventAsync(courseraCalendarId, {
        title: 'Con Fusion Table Reservation',
        startDate: reservationStartDate,
        endDate: reservationEndDate,
        allDay: false,
        location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
        timeZone: 'Asia/Hong_Kong'
      });
    }

    resetForm(){
      this.setState({
        guests: 1,
        smoking: false,
        date: ''
    });
    }

    componentDidMount(){
        console.log('component did mount');
    }

    showAlert() {
        let alertText = ``;
        alertText = alertText.concat('Number of Guests: ' + this.state.guests)
        alertText = alertText.concat(`\nSmoking?: `);
        alertText = alertText.concat(this.state.smoking ? 'True' : 'False');
        alertText = alertText.concat( `\nDate and Time: `);
        alertText = alertText.concat(this.state.date);
        Alert.alert(
          'Your Reservation OK?',
          alertText,
          [
            {
              text: 'Cancel',
              onPress: () => this.resetForm(),
              style: 'cancel'
            },
            { text: 'OK', 
              onPress: () => {
                this.presentLocalNotification(this.state.date);
                this.resetForm();
              } }
          ]
        );
      }
    
    async obtainNotificationPermission() {
      let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
          if (permission.status !== 'granted') {
              Alert.alert('Permission not granted to show notifications');
          }
      }
      return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    showDatepicker = () => {
      this.setState({showCalendar: true})
    };

    onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({showCalendar: false});
      this.setState({date: currentDate});
    }
    

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn">
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <Button onPress={this.showDatepicker} title="Calendar" />
                {this.state.showCalendar && (<DateTimePicker
                    testID="dateTimePicker"
                    mode='datetime'
                    style={{flex: 2, marginRight: 20}}
                    value={this.state.date}
                    is24Hour={true}
                    format='DD-MM-YYYY hh:mm'
                    display="default"
                    onChange={this.onDateChange}
                />)}
                
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                </Animatable.View>
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={this.state.showModal}
                  onDismiss={() => {this.toggleModal(); this.resetForm();}}
                  onRequestClose={() => {this.toggleModal(); this.resetForm();}}
                  >
                  <View style = {styles.modal}>
                      <Text style = {styles.modalTitle}>Your Reservation</Text>
                      <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                      <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                      <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                      <Button 
                          onPress = {() =>{this.toggleModal(); this.resetForm();}}
                          color="#512DA8"
                          title="Close" 
                          />
                  </View>
                </Modal>
            </ScrollView>
        );
    }

};

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

export default Reservation;