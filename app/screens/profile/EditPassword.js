/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Button
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
// import components
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import {Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

// import colors
import Colors from '../../theme/colors';

// EditProfile Config
const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

// EditProfile Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  editForm: {
    paddingHorizontal: 20,
  },
  overline: {
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

// EditProfile
class EditPassword extends Component {

    sendinfo = () =>{
        let newpwd = this.props.newpwd
        let oldpwd = this.props.oldpwd
        let confirmpwd = this.props.confirmpwd
        let id = this.props.user.id
        //console.log(id,newpwd,oldpwd,confirmpwd)
        this.props.sendpasswordchange(newpwd,oldpwd,confirmpwd,id)
      }
  constructor(props) {
    super(props);
    this.state = {
      name: 'John Doe',
      nameFocused: false,
      email: 'john.doe@example.com',
      emailFocused: false,
      phone: '+1 23 4567890',
      phoneFocused: false,
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nameChange = text => {
    this.setState({
      name: text,
    });
  };

  nameFocus = () => {
    this.setState({
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };

  emailChange = text => {
    this.setState({
      email: text,
    });
  };
  newChange = text => {
    this.props.newpassword(text)
  };
  confirmChange = text => {
    this.props.confirmpassword(text)
   };
   oldChange = text => {
    this.props.oldpassword(text)
   };
  emailFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: true,
      phoneFocused: false,
    });
  };

  phoneChange = text => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: false,
      phoneFocused: true,
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      name,
      nameFocused,
      email,
      emailFocused,
      phone,
      phoneFocused,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView enableOnAndroid>

          <View style={styles.editForm}>
            <Subtitle2 style={styles.overline}>Old Password</Subtitle2>
            <UnderlineTextInput
              onRef={r => {
                this.name = r;
              }}
              value={this.props.oldpwd}
              onChangeText={this.oldChange}
              onFocus={this.nameFocus}
              inputFocused={nameFocused}
              onSubmitEditing={this.focusOn(this.email)}
              returnKeyType="next"
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder={'Old Password'}
            />

            <Subtitle2 style={styles.overline}>New Password</Subtitle2>
            <UnderlineTextInput
              onRef={r => {
                this.email = r;
              }}
              value={this.props.newpwd}
              onChangeText={this.newChange}
              onFocus={this.emailFocus}
              inputFocused={emailFocused}
              onSubmitEditing={this.focusOn(this.phone)}
              returnKeyType="next"
              
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder={'Enter new password'}
            />

            <Subtitle2 style={styles.overline}>Confirm Password</Subtitle2>
            <UnderlineTextInput
              onRef={r => {
                this.phone = r;
              }}
              value={this.props.confirmpwd}
             
              onChangeText={this.confirmChange}
              onFocus={this.phoneFocus}
              inputFocused={phoneFocused}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder={'Re enter new password'}
            />
          </View>
        </KeyboardAwareScrollView>

        <Button
              color={'green'}
              rounded
              borderRadius
              onPress={()=>this.sendinfo()}
              title={'Change'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />
        <ActivityIndicatorModal
              statusBarColor={Colors.primaryColor }
              message="Changing your password . . ."
              onRequestClose={this.closeModal}
              title="Please wait"
              visible={this.props.regloader}
            />
      </SafeAreaView>
    );
  }
}

function mapStateToProps( state ) {
  return { 
    user:state.auth.user,
    regloader:state.auth.regloader,
    confirmpwd:state.auth.confirmpwd,
    newpwd:state.auth.newpwd,
    oldpwd:state.auth.oldpassword
  };
}

export default connect(mapStateToProps, actions)(EditPassword);
