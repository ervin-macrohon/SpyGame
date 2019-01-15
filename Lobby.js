import React, {Component} from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button } from './Button';

export default class Lobby extends Component{
    static navigationOptions = {
        title: 'Lobby',
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
        buttonText: 'Waiting...',
        buttonDisabled: true,
        players: [],
        capacity: '1/?'
    }

    componentDidMount(){
        setInterval(this.reload, 1000);
        this.reload();
    }

    reload = async() => {
         try {
             let response = await fetch(
                'https://spygame-em.herokuapp.com/room/' + this.props.navigation.state.params.roomId
            );
            if (response.status === 200){
                let responseJson = await response.json();
                if (this.isRoomFull(responseJson.capacity)){
                    this.setState({
                        players: responseJson.players, 
                        capacity: responseJson.capacity,
                        buttonText: 'Start!',
                        buttonDisabled: false
                    });
                }else{
                    this.setState({
                        players: responseJson.players, 
                        capacity: responseJson.capacity
                    });
                }
            }else{
                console.log(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }

    isRoomFull = (capacityString) => {
        let splitStr = capacityString.split('/');
        let occupancy = splitStr[0];
        let capacity = splitStr[1];
        if (parseInt(occupancy, 10) == capacity){
            return true;
        }else{
            return false;
        }
    }

    navigateDashboard = () => {
        this.props.navigation.navigate('dashboard', {
            roomId: this.props.navigation.state.params.roomId,
            nickname: this.props.navigation.state.params.nickname
        })
    }

    enableButton = () => {
        this.setState({
            buttonText: 'Start!',
            buttonDisabled: false
        });
    }

    startGame = async () => {
        try{
            let response = await fetch(
                'https://spygame-em.herokuapp.com/state/' + this.props.navigation.state.params.roomId, 
                {
                    method: 'POST'
                }
            );
            if (response.status === 200){
                this.navigateDashboard();
            }else{
                this.enableButton();
                console.error(await response.json().message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    submit = async () => {
        this.setState({
            buttonText: 'Loading...',
            buttonDisabled: true
        });
        await this.startGame();
    }

    render() {
        const {state} = this.props.navigation;
        return (
            <View style={[s.background, s.room_form_container]}>
                <View style={[s.form, {height: '70%'}]}>
                    <Text style={[s.lobby_text, s.lobby_title]}>
                        Room no: {state.params.roomId} ({this.state.capacity})
                    </Text>
                    <Text style={s.lobby_text}>
                        Players:
                    </Text>
                    <FlatList 
                        data={this.state.players}
                        renderItem={({ item }) => 
                            <Text style={s.lobby_text}>{item}</Text>
                        }
                        keyExtractor={(item) => item}
                        scrollEnabled={true}
                        />
                    <Button 
                        buttonStyle={s.lobby_button}
                        onPress={this.submit}
                        label={this.state.buttonText}
                        disabled={this.state.buttonDisabled}/>
                </View>
            </View>
        );
    }
}