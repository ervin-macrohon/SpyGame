import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import s from './Style';
import Image from 'react-native-scalable-image';
import { Button } from './Button';
import { Scorecard } from './Scorecard';
import PlayerAvatar from './PlayerAvatar';
import FlipCard from 'react-native-flip-card';
import cardBack from './assets/card.png';
import { Avatar } from 'react-native-elements';

export default class Dashboard extends Component {
    static navigationOptions = {
        title: 'Player Dashboard',
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
        image: `http://i.imgur.com/j5PRT7G.png`,
        overlay: false,
        players: null,
        playerTurn: null,
        proposeButtonDisabled: true,
        chosenAvatarStyleList: null,
        scorecard: null,
        missionRequirements: ['?', '?', '?', '?', '?'],
        random: null
    }

    componentDidMount(){
        setInterval(this.reload, 1000);
        this.loadInitialState();
    }

    loadInitialState = async() => {
        try {
            let response = await fetch(
               'https://spygame-em.herokuapp.com/state/' + this.props.navigation.state.params.roomId
           );
           if (response.status === 200){
               let responseJson = await response.json();
               this.setState({
                   playerTurn: responseJson.playerTurn,
                   players: responseJson.players,
                   scorecard: responseJson.scorecard
               });
               this.calculateInitialValues()
           }else{
               console.log(response.statusText);
           }
       } catch (error) {
           console.error(error);
       }
    }

    calculateInitialValues = () => {
        console.log('players', this.state.players);
        this.checkProposeButton();
        this.calculateMissionRequirements();
    }

    reload = async() => {
        try {
            let response = await fetch(
               'https://spygame-em.herokuapp.com/state/' + this.props.navigation.state.params.roomId
           );
           if (response.status === 200){
               let responseJson = await response.json();
               this.setState({
                   playerTurn: responseJson.playerTurn,
                   scorecard: responseJson.scorecard
               });
           }else{
               console.log(response.statusText);
           }
       } catch (error) {
           console.error(error);
       }
   }

   submitProposition = () => {
        console.log('submitting: ', this.state.chosenAvatarStyleList);
   }

   checkProposeButton = () => {
       if (true){ // for testing
        //if (this.state.playerTurn == this.props.navigation.state.params.nickname){
            this.setState({proposeButtonDisabled: false});
        }else{
            this.setState({proposeButtonDisabled: true});
        }
   }

    calculateMissionRequirements = () => {
        let calculatedMissionReq = null;
        console.log('length', this.state.players.length);
        switch(this.state.players.length){
            case 5:
                calculatedMissionReq = [2, 3, 2, 3, 3];
                break;
            case 6:
                calculatedMissionReq =  [2, 3, 4, 3, 4];
                break;
            case 7:
                calculatedMissionReq =  [2, 3, 3, 4, 4];
                break;
            case 8:
                calculatedMissionReq =  [3, 4, 4, 5, 5];
                break;
            case 9:
                calculatedMissionReq =  [3, 4, 4, 5, 5];
                break;
            case 10:
                calculatedMissionReq =  [3, 4, 4, 5, 5];
                break;
            default:
                calculatedMissionReq =  ['?', '?', '?', '?', '?'];
                break;
        }
        this.setState({missionRequirements: calculatedMissionReq});
    }

    calculateNumPlayersToChoose = () => {
        let turnNumber = this.state.scorecard.length;
        return this.state.missionRequirements[turnNumber];
    }

    toggleOverlay = () => {
        this.setState(prevState => ({
            overlay: !prevState.overlay
        }));
    }

    toggleChosenAvatarStyle = (nickname) => {
        let playerIndex = this.state.players.indexOf(nickname);
        console.log('playerIndex', playerIndex);
        let original = this.state.chosenAvatarStyleList;
        this.setState({
            chosenAvatarStyleList: this.updateArray(original, playerIndex, !original[playerIndex]),
            random: true
        }, () => console.log(this.state.chosenAvatarStyleList));
    }

    updateArray = (original, index, updatedValue) => {
        let newArray = new Array(original.length);
        for (let i = 0; i < original.length; i++){
            if (i == index){
                newArray[i] = updatedValue;
            }else{
                newArray[i] = original[i];
            }
        }
        console.log('new array', newArray);
        return newArray;
    }

    createChosenAvatarStyleList = () => {
        if (this.state.chosenAvatarStyleList == null){
            let newArray = [];
            for(let i = 0; i < this.state.players.length; i++){
                newArray.push(false);
            }
            this.setState({chosenAvatarStyleList: newArray});
        }
    }

    getContainerStyle = (nickname) => {
        let playerIndex = this.state.players.indexOf(nickname);
        console.log('container style: player index', playerIndex);
        let chosenAtIndex = this.state.chosenAvatarStyleList[playerIndex];
        console.log('container style: chosen at index', this.state.chosenAvatarStyleList);
        if (chosenAtIndex){
            return s.chosen_avatar;
        } else{
            return s.not_chosen_avatar;
        }
    }

    renderModal = () => {
        if (this.state.overlay){
            return <View style={s.overlay_container}>
                <View style={s.propose_mission_modal}>
                    <Text style={s.modal_title}>
                        Choose {this.calculateNumPlayersToChoose()} players:
                    </Text>

                    <View style={s.player_chooser}>
                        {this.createChosenAvatarStyleList()}
                        {console.log('re-render has happened', this.state.chosenAvatarStyleList)}
                        <FlatList 
                            data={this.state.players}
                            renderItem={({ item }) => 
                                <View style={s.avatar_spacing}>
                                    <TouchableOpacity
                                        delayPressIn={0}
                                        delayPressOut={0}
                                        onPress={() => this.toggleChosenAvatarStyle(item)}>
                                        {/* <Avatar
                                            medium
                                            rounded
                                            title={item}
                                            activeOpacity={0.7}
                                            containerStyle={() => this.getContainerStyle(item)}
                                            /> */}
                                        <PlayerAvatar
                                            style={this.getContainerStyle(item)}
                                            title={item}
                                            />
                                    </TouchableOpacity>
                                </View>
                            }
                            horizontal={true}
                            scrollEnabled={true}
                            keyExtractor={(item) => item}/>
                        
                    </View>

                    <Button
                        buttonStyle={s.propose_button}
                        buttonTextStyle={s.propose_button_text}
                        label="Propose"
                        onPress={() => {
                            this.submitProposition();
                            this.toggleOverlay();}
                        }/>
                </View>
            </View>;
        }
    }

    render(){
        return(
            <View style={s.background}>
                <View style={s.dashboard_container}>
                    <FlipCard
                        flipHorizontal={true}
                        flipVertical={false}
                        style={{borderWidth: 0}}>
                        <Image
                            height={500}
                            style={s.character_image}
                            source={{
                                uri: this.state.image
                            }}
                        />
                        <Image
                            height={500}
                            style={s.character_image}
                            source={cardBack
                            }
                        />
                    </FlipCard>
                    
                    <View style={s.dashboard_footer}>
                        <Button
                            buttonStyle={s.propose_button}
                            buttonTextStyle={s.propose_button_text}
                            label="Propose Mission"
                            onPress={() => {
                                this.createChosenAvatarStyleList();
                                this.toggleOverlay();
                            }}
                            disabled={this.state.proposeButtonDisabled}/>
                        <Scorecard 
                            missionRequirements={this.state.missionRequirements}/>
                    </View>
                </View>
                {this.renderModal()}
                
                
            </View>
        );
    }
}