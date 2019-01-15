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
        headerLeft: null,
        gesturesEnabled: false
    };

    state = {
        nickname: '',
        roomNumber: '',
        numberInputStyle: null,
        nicknameInputStyle: null,
        errorMessage: '',
        buttonText: 'Join'
    }

    handleNicknameChange = (value) => {
        this.setState({nickname: value});
    }

    handleRoomNumberChange = (value) => {
        this.setState({roomNumber: value});
    }

    submit = async () => {
        if (!this.validateNumber() || !this.validateNickname()){
            return;
        }
        this.setState({
            buttonText: 'Loading...',
            buttonDisabled: true
        });
        await this.joinRoom();
    }

    enableButton = () => {
        this.setState({
            buttonText: 'Join',
            buttonDisabled: false
        });
    }

    joinRoom = async () => {
        try{
            let response = await fetch(
                'https://spygame-em.herokuapp.com/room/' + this.state.roomNumber + '/' + this.state.nickname, 
                {
                    method: 'PUT'
                }
            );
            let responseJson = await response.json();
            if (response.status === 200){
                this.props.navigation.navigate('lobby', {
                    roomId: this.state.roomNumber,
                    nickname: this.state.nickname
                })
            }else{
                this.setState({errorMessage: responseJson.message});
                this.enableButton();
            }
        } catch (error) {
            console.error(error);
        }
    }

    validateNickname = () => {
        if( /[^a-zA-Z0-9]/.test( this.state.nickname ) ) {
            this.setState({
                nicknameInputStyle: s.red_shadow,
                errorMessage: 'Error: nickname needs to be alphanumeric'
            })
            return false;
        }else if (this.state.nickname.length !== 3){
            this.setState({
                nicknameInputStyle: s.red_shadow,
                errorMessage: 'Error: nickname needs to be exactly 3 character long'
            })
            return false;
        }else{
            this.setState({
                nicknameInputStyle: null
            });
            return true;
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
                        style={[s.input_box, this.state.nicknameInputStyle]}
                        placeholder="Nickname"
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.nickname}
                        onChangeText={this.handleNicknameChange}
                        onBlur={this.validateNickname}
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
                        onBlur={this.validateNumber}
                        />
                    <Text style={s.error_message}>
                        {this.state.errorMessage}
                    </Text>
                    <Button 
                        onPress={this.submit}
                        label={this.state.buttonText}
                        buttonDisabled={this.state.buttonDisabled}/>
                </View>
            </View>
        );
    }
}