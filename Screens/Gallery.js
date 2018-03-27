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

const IMAGE_SIZE_DEFAULT = 160;

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
    image: {
        borderWidth: 4,
        borderColor: 'black',
    }
});

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
          imagesList: [],
          refreshing: false,
          currentPage: 0,
          indexOfScreen: 'portrait',
          widthScreen: width,
        }
    }

    componentDidMount() {
        this.getItems();
        BackHandler.addEventListener('hardwareBackPress', this.backAndroid);   
        Dimensions.addEventListener("change", this.orientationChange)
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
        this.setScreenSize(width, height);        
    }

    backAndroid = () => {
        Alert.alert(
          '', 'Are you sure you want to exit from the app?',
          [
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
            },
            {
              text: "Close"
            }
          ]
        )
        return true;
    }

    orientationChange = (e) => {
        this.setScreenSize(e.screen.width, e.screen.height);    
    }

    setScreenSize = (width, height) => {
        if (width > height) {
            this.setState({indexOfScreen: 'landscape', widthScreen: width});
        } else {
            this.setState({indexOfScreen: 'portrait', widthScreen: width});
        }; 
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
        Dimensions.removeEventListener('change');
    }

    _renderItem = (item) => {
        return (
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => this.selectPhoto(item)}
          >                            
              <Image 
                source={{uri: item.item.image_url[0]}}
                style={[this.state.indexOfScreen === 'portrait' ? 
                    {width: this.state.widthScreen / 2, height: this.state.widthScreen / 2} : 
                    {width: this.state.widthScreen / 4, height: this.state.widthScreen / 4}, 
                    styles.image
                 ]}
              />
          </TouchableHighlight>
        );
    }
  
    _keyExtractor = (item, index) => index;
    
    getItems = async () => {
        let imagesQuery = await api.getImagesFromApi();
        this.setState({
            imagesList: imagesQuery.photos,
            currentPage: imagesQuery.current_page
        });
    }

    handleLoadMore = async () => {
        let imagesQuery = await api.getImagesFromApi(this.state.currentPage + 1);
        let newArray = this.state.imagesList.concat(imagesQuery.photos);
        this.setState({
            imagesList: newArray,
            currentPage: imagesQuery.current_page
        });
    }

    selectPhoto = (item) => {
        this.props.navigation.navigate('FullScreenPhoto', {imagesList: this.state.imagesList, currentImage: item.index, orientation: this.state.indexOfScreen});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Text style={styles.title}>Galerry app</Text>
                </View>
                { this.state.imagesList.length ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={this._keyExtractor}
                        horizontal={false}
                        key = {this.state.indexOfScreen === 'portrait' ? 1 : 0 }
                        numColumns={this.state.indexOfScreen === 'portrait' ? 2 : 4}
                        renderItem={this._renderItem}
                        data={this.state.imagesList}
                        initialListSize={100}
                        extraData={this.state.imagesList}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.1}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getItems()}
                                tintColor="#afb6c3"
                            /> 
                        }
                    /> :
                    <Text>No Images</Text>
                  }
            </View>
        );
    }
}
