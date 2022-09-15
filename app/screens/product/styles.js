import {StyleSheet} from 'react-native';
import Colors from '../../theme/colors';

import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';

// import colors


//import sample data
import sample_data from '../../config/sample-data';

// Product Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';


export default StyleSheet.create({
    topArea: {flex: 0, backgroundColor: Colors.primaryColor},
    screenContainer: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    header: {
      width: '100%',
      height: 80,
    },
    productImg: {
      width: '100%',
      height: 236,
      resizeMode: 'cover',
    },
    bottomOverlay: {flex: 1},
    topButton: {
      position: 'absolute',
      top: 16,
      borderRadius: 18,
      backgroundColor: Colors.background,
    },
    left: {left: 16},
    right: {right: 16},
    buttonIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 36,
      height: 36,
    },
  
    bottomButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
      width: '100%',
      padding: 16,
      backgroundColor: '#efefef',
    },
    bottomArea: {flex: 0, backgroundColor: '#efefef'},
    starContainer:{
      flex:1,flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 4
    },
    starText:{
      backgroundColor:Colors.primaryColor,
      paddingVertical:2, 
      paddingHorizontal:4,
      borderRadius:4, 
      color:Colors.white
    },
    categoryStarContainer:{
      justifyContent:'flex-end', 
      flexDirection:'row'
    },
    categoryText:{
      color:Colors.primaryColor
    },
    textStyle3: {
      color: "black",
      fontWeight: "bold",
      fontSize: 18,
      paddingHorizontal: 5,
      textAlign: 'center'
    },
    textStyle: {
      color: "grey",
      fontWeight: "bold",
      
      fontSize: 14,
      paddingHorizontal: 5,
      
    },

    from:{
      flexDirection:'row',
      margin:5
    },
    to:{
      flexDirection:'row'
    },
    location:{
      flexDirection:'column',
      margin:3,
    },
    distance:{
      flexDirection:'row',
      margin:5,
    },
    distance1:{
      flexDirection:'column',
      margin:5,
    }
  });