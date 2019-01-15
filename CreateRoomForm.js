import React, {Component} from 'react';
import { TextInput, View, Text } from 'react-native';
import { Button } from './Button';

export default class CreateRoomForm extends Component{
    static navigationOptions = {
        title: 'Create Room',
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
        numPlayers: '',
        buttonText: 'Create',
        buttonDisabled: false,
        players: null,
        roomId: null,
        nicknameInputStyle: null,
        numPlayersInputStyle: null
    }

    handleNicknameChange = (value) => {
        this.setState({nickname: value});
    }

    handleNumPlayersChange = (value) => {
        this.setState({numPlayers: value});
    }

    submit = async () => {
        if (!this.validateNickname() || !this.validateRoomCapacity()){
            return;
        }
        this.setState({
            buttonText: 'Loading...',
            buttonDisabled: true
        });
        try {
            let response = await fetch(
                'https://spygame-em.herokuapp.com/room?maxCapacity=' + this.state.numPlayers, 
                {
                    method: 'POST'
                }
            );
            let responseJson = await response.json();

            if (response.status === 200){
                this.setState({roomId: responseJson.roomId});
                await this.joinRoom();
                this.props.navigation.navigate('lobby', {
                    roomId: this.state.roomId,
                    nickname: this.state.nickname
                })
            }else{
                this.setState({
                    errorMessage: responseJson.message
                });
                this.enableButton();
            }
        } catch (error) {
            console.error(error);
        }
    }

    enableButton = () => {
        this.setState({
            buttonText: 'Create',
            buttonDisabled: false
        });
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

    validateRoomCapacity = () => {
        if (isNaN(this.state.roomId)){return false;}
        if (this.state.numPlayers < 2 || this.state.numPlayers > 10){
        //if (this.state.numPlayers < 5 || this.state.numPlayers > 10){
            this.setState({
                numPlayersInputStyle: s.red_shadow,
                errorMessage: 'Error: number of players needs to be between 5 and 10'
            })
            return false;
        }else{
            this.setState({
                numPlayersInputStyle: null
            });
            return true;
        }
    }

    joinRoom = async () => {
        try{
            let response = await fetch(
                'https://spygame-em.herokuapp.com/room/' + this.state.roomId + '/' + this.state.nickname, 
                {
                    method: 'PUT'
                }
            );
            if (response.status === 200){
                let responseJson = await response.json();
                console.log(responseJson);
            }else{
                console.log(response.statusText);
            }
        } catch (error) {
            console.error(error);
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
                        style={[s.input_box, this.state.numPlayersInputStyle]}
                        placeholder="Number of Players"
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.numPlayers}
                        onChangeText={this.handleNumPlayersChange}
                        keyboardType='numeric'
                        onBlur={this.validateRoomCapacity}
                        />
                    <Text style={s.error_message}>
                        {this.state.errorMessage}
                    </Text>
                    <Button 
                        onPress={this.submit}
                        label={this.state.buttonText}
                        disabled={this.state.buttonDisabled}/>
                </View>
            </View>
        );
    }
}