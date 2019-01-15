import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import s from './Style'

export const Scorecard = (props) => {
    return (
        <View style={s.scorecard_container}>
            <View style={s.badge}>
                <Text>{props.missionRequirements[0]}</Text>
            </View>
            <View style={s.badge}>
                <Text>{props.missionRequirements[1]}</Text>
            </View>
            <View style={s.badge}>
                <Text>{props.missionRequirements[2]}</Text>
            </View>
            <View style={s.badge}>
                <Text>{props.missionRequirements[3]}</Text>
            </View>
            <View style={s.badge}>
                <Text>{props.missionRequirements[4]}</Text>
            </View>
        </View>
    );
}