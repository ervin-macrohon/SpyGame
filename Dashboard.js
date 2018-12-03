import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import s from './Style';

export default class Dashboard extends Component {
    render(){
        return(
            <View style={s.background}>
                <Text style={s.title}>Test</Text>
            </View>
        );
    }
}