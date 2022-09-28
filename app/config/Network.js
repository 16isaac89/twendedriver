import React,{Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

const NetworkContext = React.createContext({ isConnected: true });
let unsubscribe = ""
class NetworkProvider extends Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    unsubscribe = NetInfo.addEventListener(state => {
        let internetstate = state.isInternetReachable
        this.props.setinternetstate(internetstate)
   
      });
  }

  componentWillUnmount() {
    if (unsubscribe != null) unsubscribe()
  }


  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}

function mapStateToProps( state ) {
    return { 
     user:state.auth.user,
    };
  }
  
  export default connect(mapStateToProps, actions)(NetworkProvider);