import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import s from './Style';
import { Avatar } from 'react-native-elements';

export default class PlayerAvatar extends Component {
    render(){
        return (
            <View>
                {console.log('child has been re-rendered')}
            <Avatar
                medium
                rounded
                title={this.props.title}
                activeOpacity={0.7}
                containerStyle={this.props.style}
                />
            </View>
        );
    }
}