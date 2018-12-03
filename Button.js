import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import s from './Style'

export const Button = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.onPress()}>
            <View style={[s.button, props.buttonStyle]}>
                <Text style={[s.button_text, props.buttonTextStyle]}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}