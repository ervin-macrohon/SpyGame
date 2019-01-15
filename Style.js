import { StyleSheet } from 'react-native';

export default s = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: '#b99c6b'
    },
    button: {
        width: 200,
        height: 70,
        backgroundColor: '#816c5b',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 }
    },
    button_text: {
        fontSize: 28,
        color: '#493829'
    },
    register_view_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70
    },
    room_form_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70
    },
    form: {
        height: '50%',
        width:  '85%',
        backgroundColor: '#a9a18c',
        borderRadius: 10,
        shadowOpacity: 0.75,
        shadowRadius: 20,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input_box: {
        fontSize: 28,
        marginLeft: 10,
        marginRight: 10,
        color: '#816c5b'
    },
    red_shadow: {
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'red',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#a9a18c',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    dashboard_container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 520
    },
    character_image: {
        borderRadius: 20,
        marginTop: 20
    },
    dashboard_footer: {
        flexDirection: 'row',
        marginTop: 20
    },
    propose_button: {
        height: 50, 
        width: 150,
        marginTop: 22,
        marginRight: 10,
        borderRadius: 5
    },
    propose_button_text: {
        fontSize: 18
    },
    scorecard_container: {
        width: '40%',
        height: 100,
        borderRadius: 5,
        backgroundColor: '#a9a18c',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    badge: {
        backgroundColor: '#dbca69',
        height: 20,
        width: 20,
        borderRadius: 10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center'
    },
    overlay_container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    propose_mission_modal: {
        height: '30%',
        width: '85%',
        backgroundColor: '#a9a18c',
        shadowOpacity: 0.75,
        shadowRadius: 10,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center'
    },
    modal_title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#613318',
        marginTop: 10
    },
    player_chooser: {
        height: '40%',
        width: '85%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingTop: 20
    },
    lobby_text: {
        color: '#493829',
        fontSize: 24,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    lobby_title: {
        fontWeight: 'bold',
        fontSize: 26
    },
    lobby_button: {
        marginBottom: 20
    },
    error_message: {
        color: 'red',
        marginLeft: 20,
        marginRight: 20
    },
    player_chooser_avatar: {
        marginLeft: 10,
        marginRight: 10
    },
    chosen_avatar: {
        backgroundColor: '#dbca69'
    },
    not_chosen_avatar: {
        backgroundColor: '#816c5b'
    },
    avatar_spacing: {
        marginLeft: 5,
        marginRight: 5
    }
});