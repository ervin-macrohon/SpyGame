import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import s from './Style';
import { Button } from './Button';

export default class RegisterView extends Component {
    static navigationOptions = {
        title: 'Avalon',
        headerStyle: {
          backgroundColor: '#855723'
        },
        headerTintColor: '#613318',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 32
        },
    };
    
    navToCreateRoom = () => {
        this.props.navigation.navigate('createRoomForm');
    }
    
    navToJoinRoom = () => {
        this.props.navigation.navigate('joinRoomForm');
    }
    render(){
        return(
            <View style={s.background}>
                <View style={s.register_view_container}>
                    <Button 
                        onPress={this.navToCreateRoom}
                        label='Create Room'
                        buttonStyle={{marginBottom: 40}}/>
                    <Button 
                        onPress={this.navToJoinRoom}
                        label='Join Room'/>
                </View>
            </View>
        );
    }
}