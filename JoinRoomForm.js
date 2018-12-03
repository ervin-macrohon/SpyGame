import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from './Button';

export default class JoinRoomForm extends Component{
    static navigationOptions = {
        title: 'Join Room',
        headerStyle: {
          backgroundColor: '#855723'
        },
        headerTintColor: '#613318',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 28
        },
    };

    state = {
        nickname: '',
        roomNumber: '',
        numberInputStyle: null,
        errorMessage: ''
    }

    handleNicknameChange = (value) => {
        this.setState({nickname: value});
    }

    handleRoomNumberChange = (value) => {
        this.setState({roomNumber: value});
    }

    submit = () => {
        if (this.validateNumber()){
            console.log('submitted request with ', this.state)
        }else{
            console.log('invalid field');
        }
    }

    validateNumber = () => {
        if (isNaN(this.state.roomNumber)){
            this.setState({
                numberInputStyle: s.red_shadow,
                errorMessage: 'Error: invalid number'
            });
            return false;
        }else{
            this.setState({
                numberInputStyle: null
            });
            return true;
        }
    }

    render() {
        return (
            <View style={[s.background, s.room_form_container]}>
                <View style={s.form}>
                    <TextInput 
                        style={s.input_box}
                        placeholder="Nickname"
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.nickname}
                        onChangeText={this.handleNicknameChange}
                        />
                    <TextInput 
                        style={[s.input_box, this.state.numberInputStyle]}
                        placeholder="Room Number"
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.roomNumber}
                        onChangeText={this.handleRoomNumberChange}
                        keyboardType='numeric'
                        onBlur={() => this.validateNumber()}
                        />
                    <Text style={{color: 'red'}}>
                        {this.state.errorMessage}
                    </Text>
                    <Button 
                        onPress={this.submit}
                        label="Join"/>
                </View>
            </View>
        );
    }
}