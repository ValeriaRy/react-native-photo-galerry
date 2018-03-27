import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import ShareIcon from './../assets/share.png';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {    
      position: "absolute",
      bottom: 0, 
      paddingHorizontal: 10, 
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      width: width,
      height: 50,
    },
    text: {
        color: "white",
    }
  });

export default class InfoImage extends Component {


  render() {
      console.log(this.props.image)
    return (
        <View style={styles.container}> 
            <View>
                <Text style={[styles.text, {fontWeight: '900'}]}>{this.props.image.name}</Text>  
                <Text style={styles.text}>{this.props.image.user.firstname} {this.props.image.user.lastname[0]}.</Text> 
                <Text style={styles.text}>{this.props.image.camera}</Text>  
            </View> 
            <TouchableHighlight>
                <Image 
                    style={styles.button}
                    source={ShareIcon}
                />
            </TouchableHighlight>
        </View>
    );
  }
}
