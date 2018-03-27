import { StackNavigator } from 'react-navigation';
import GalleryScreen from './Screens/Gallery';
import FullPhotoScreen from './Screens/FullScreenImage';
  
const createRootNavigator = () => {
    return StackNavigator(
      {
        Gallery: {
          screen: GalleryScreen,
        },
        FullScreenPhoto: {
          screen: FullPhotoScreen
        }
      },
    {
      mode: 'card',
      headerMode: 'none',
    });
  }
  
  export default createRootNavigator;