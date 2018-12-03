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
        //color: 'red',
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
    }
});