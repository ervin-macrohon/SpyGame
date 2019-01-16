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
            {console.log('child has been rendered with ', props.style)}
            <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                onPress={() => props.onPress(props.nickname)}>
                <Avatar
                    medium
                    rounded
                    title={props.nickname}
                    activeOpacity={0.7}
                    containerStyle={props.style}
                    />
            </TouchableOpacity>
        </View>
    );
}