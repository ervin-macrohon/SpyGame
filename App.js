import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import RegisterView from './RegisterView';
import Dashboard from './Dashboard';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import Lobby from './Lobby';

export default createAppContainer(createStackNavigator({
  register: { screen: RegisterView },
  dashboard: { screen: Dashboard },
  createRoomForm: { screen: CreateRoomForm },
  joinRoomForm: { screen: JoinRoomForm },
  lobby: { screen: Lobby }
}))