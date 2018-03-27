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
        }
    }

    componentDidMount() {
        this.getItems();
        BackHandler.addEventListener('hardwareBackPress', this.backAndroid);   
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    _renderItem = (item) => {
        return (
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => this.selectPhoto(item)}
          >                            
              <Image 
                source={{uri: item.item.image_url[0]}}
                style={[{width: width / 2, height: width / 2}, styles.image]}
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
        this.props.navigation.navigate('FullScreenPhoto', {imagesList: this.state.imagesList, currentImage: item.index});
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
                        numColumns={2}
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
