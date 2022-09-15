import React from 'react';
import { Container, Spinner, TextH3 } from "./UI";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {window} from "./Layout";
import { ActivityIndicator,Text,View } from 'react-native-web';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as Location from 'expo-location';

class Scanner extends React.Component{
static navigationOptions = {
header: null
}
// Component State
state = {
hasCameraPermission: null, // if app has permissions to acess camera
isScanned: false // scanned
}
async componentDidMount() {
// ask for camera permission
const { status } = await Permissions.askAsync(Permissions.CAMERA);
console.log(status);
this.setState({ hasCameraPermission: status === "granted" ? true : false });
}
handleBarCodeScanned = async({ type, data }) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude
    let longitude = location.coords.longitude
    let order = data
    let id = this.props.user.id
   this.props.upDateOrder(latitude,longitude,order,id)
}
render(){
const { hasCameraPermission, isScanned } = this.state;
if(hasCameraPermission === null){
// requesting permission
return (
<Spinner />
);
}
if(hasCameraPermission === false){
//permission denied
return (
<Container>
<TextH3>Please grant Camera permission</TextH3>
</Container>
)
}
if(hasCameraPermission === true && !isScanned && this.props.navigation.isFocused() ){
// we have permission and this screen is under focus
return <Container style = {{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center'
}}>
<TextH3>Scan code inside window</TextH3>
<BarCodeScanner
onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
style = {{
height: window.height / 2,
width: window.height,
}}
>
</BarCodeScanner>
</Container>
}
else{
return <Spinner />;
}
}
}

function mapStateToProps( state ) {
    return { 
      token: state.cart.quantity,
      username:state.auth.username,
      password:state.auth.password,
      regloader:state.auth.regloader,
      isloggedin:state.auth.loggedin,
      user:state.auth.user,
      loader:state.order.loader
    };
  }
  
  export default connect(mapStateToProps, actions)(Scanner);