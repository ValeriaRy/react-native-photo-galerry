import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight, 
    Dimensions, 
    FlatList,
    BackHandler,
    RefreshControl,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import * as api from './../actions/api'; 

let styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    header: {
        backgroundColor: "blue",
        justifyContent: "center",
        height: 60,
        paddingTop: 20,
        paddingLeft: 15,
    },
    title: {  
        color: "white",  
        fontWeight: '600'      
    },
});

export default class FullScreenImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backAndroid);   
    }

    backAndroid = () => {
        this.props.navigation.dispatch({type: 'Navigation/BACK'});
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

  

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableHighlight 
                        onPress={() => this.props.navigation.dispatch({type: 'Navigation/BACK'})}
                        underlayColor={'transparent'}
                    >
                        <Text style={styles.title}>Cancel</Text>
                    </TouchableHighlight>
                </View>
                <Text>No Images</Text>
            </View>
        );
    }
}
