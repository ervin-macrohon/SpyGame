import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import s from './Style';
import { Avatar } from 'react-native-elements';

export const PlayerAvatar = (props) => {
    return (
        <View style={s.avatar_spacing}>
            <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                onPress={() => props.onPress(props.nickname)}>
                <Avatar
                    medium
                    rounded
                    title={props.nickname}
                    activeOpacity={0.7}
                    containerStyle={() => props.getContainerStyle(props.nickname)}
                    />
            </TouchableOpacity>
        </View>
    );
}