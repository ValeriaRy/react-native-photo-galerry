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
import ImageZoom from 'react-native-image-pan-zoom';

let styles = StyleSheet.create({
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
});

export default class FullScreenImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            sliderRef: null,
            image: null,
            widthScreen: width,
            heightScreen: height * 0.4,
            indexOfScreen: 'portrait',
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        this.setState({image: params.imagesList[params.currentImage]});
        BackHandler.addEventListener('hardwareBackPress', this.backAndroid);   
        Dimensions.addEventListener("change", this.orientationChange);
        this.setScreenSize(width, height);
    }

    backAndroid = () => {
        this.props.navigation.dispatch({type: 'Navigation/BACK'});
        return true;
    }

    orientationChange = (e) => {
        this.setScreenSize(e.screen.width, e.screen.height); 
    }

    setScreenSize = (width, height) => {
        const { params } = this.props.navigation.state;
        if (width > height || params.orientation === 'landscape') {
            this.setState({indexOfScreen: 'landscape', widthScreen: width, heightScreen: height});
        } else {
            this.setState({indexOfScreen: 'portrait', widthScreen: width, heightScreen: height * 0.4});
        }; 
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
        Dimensions.removeEventListener('change');
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
                <ImageZoom 
                    cropWidth={this.state.widthScreen}
                    cropHeight={this.state.heightScreen}
                    imageWidth={this.state.indexOfScreen === 'portrait' ? this.state.widthScreen : this.state.widthScreen / 2}
                    imageHeight={this.state.heightScreen}
                >
                    <Image 
                        style={[this.state.indexOfScreen === 'portrait' ? {width: this.state.widthScreen} : {width: this.state.widthScreen / 2},
                            {height: this.state.heightScreen}]}
                        source={{uri: item.image_url[0]}}
                    />
                </ImageZoom>
            </View>
        );
    }

    _onSnapToItem(index) {
        const { params } = this.props.navigation.state;

        this.setState({image: params.imagesList[index]});
    }

    render() {
        const { params } = this.props.navigation.state;

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
                    sliderWidth={this.state.widthScreen}
                    itemWidth={this.state.widthScreen}
                    onSnapToItem={(index) => this._onSnapToItem(index)}
                />
                {this.state.image ? <InfoImage image={this.state.image} widthScreen={this.state.widthScreen}/> : null}
            </View>
        );
    }
}
