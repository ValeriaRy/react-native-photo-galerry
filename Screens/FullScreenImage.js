import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight, 
    Dimensions, 
    BackHandler,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import InfoImage from './../Components/InfoImage';

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
    slide: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: width,
        height: height * 0.4,
    }
});

export default class FullScreenImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            sliderRef: null,
            image: null,
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        this.setState({image: params.imagesList[params.currentImage]});
        BackHandler.addEventListener('hardwareBackPress', this.backAndroid);   
    }

    backAndroid = () => {
        this.props.navigation.dispatch({type: 'Navigation/BACK'});
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    defineCarousel = (carousel) => {
        this._carousel = carousel; 
        if (!this.state.sliderRef) { 
          this.setState({sliderRef: carousel});
        }
    }  

    _renderItem ({item, index}) {   
        return (
            <View style={styles.slide}>
                <Image 
                  style={[styles.image]}
                  source={{uri: item.image_url[0]}}
                />
            </View>
        );
    }

    _onSnapToItem(index) {
        const { params } = this.props.navigation.state;

        this.setState({image: params.imagesList[index]});
    }

    render() {
        const { params } = this.props.navigation.state;

        console.log(this.state.image)

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
                <Carousel
                    ref={(carousel) => this.defineCarousel(carousel)}
                    data={params.imagesList}
                    renderItem={(item, index) => this._renderItem(item, index)}
                    firstItem={params.currentImage}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={(index) => this._onSnapToItem(index)}
                />
                {this.state.image ? <InfoImage image={this.state.image}/> : null}
            </View>
        );
    }
}
