import React, {Component} from 'react';
import { TextInput, View } from 'react-native';
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
    };

    state = {
        nickname: '',
        numPlayers: ''
    }

    handleNicknameChange = (value) => {
        this.setState({nickname: value});
    }

    handleNumPlayersChange = (value) => {
        this.setState({numPlayers: value});
    }

    submit = () => {
        console.log('submitted request with ', this.state)
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
                        style={s.input_box}
                        placeholder="Number of Players"
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.numPlayers}
                        onChangeText={this.handleNumPlayersChange}
                        />
                    <Button 
                        onPress={this.submit}
                        label="Create"/>
                </View>
            </View>
        );
    }
}