/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

// Product Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
// const imgHolder = require('../../assets/img/imgholder.png');
const RATING_ICON = IOS ? 'ios-star' : 'md-star';
import styles from './styles'
import Divider from '../../components/divider/Divider';
import { MaterialIcons } from '@expo/vector-icons';
// Product
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: sample_data.product_details,
      extras: sample_data.product_variant,
      favorite: false,
    };
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onPressAddToFavorites = () => {
    const {favorite} = this.state;

    this.setState({
      favorite: !favorite,
    });
  };

  setExtraDish = (item) => () => {
    const {product, extras} = this.state;
    const index = extras.indexOf(item);
    const picked = extras[index].picked;

    if (picked) {
      product.singleProductPrice -= item.price;
      product.total -= product.quantity * item.price;
    } else {
      product.singleProductPrice += item.price;
      product.total += product.quantity * item.price;
    }

    extras[index].picked = !picked;

    this.setState({
      product,
      extras: [...extras],
    });
  };

  onPressIncreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = product;

    quantity += 1;
    product.quantity = quantity;

    const total = quantity * product.singleProductPrice;
    product.total = total;

    this.setState({
      product,
    });
  };

  onPressDecreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = product;

    quantity -= 1;
    quantity = quantity < 1 ? 1 : quantity;
    product.quantity = quantity;

    const total = quantity * product.singleProductPrice;
    product.total = total;

    this.setState({
      product,
    });
  };

  render() {
    const {product, favorite, extras} = this.state;
    const {price, description, quantity, total} = product;

    return (
      <Fragment>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.topArea} />
        <View style={styles.screenContainer}>
          <ScrollView>
            <View style={styles.header}>
              <View style={[styles.topButton, styles.left]}>
                <TouchableItem onPress={this.goBack} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View
                style={[
                  styles.topButton,
                  styles.right,
                  favorite && styles.favorite,
                ]}>
                <Text style={styles.textStyle3}>Trip: #001212</Text>
              </View>
            </View>

            <View style={styles.from}>
            <MaterialIcons name="location-history" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Pickup Location</Text>
                      <Text style={styles.textStyle3}>adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>


              <View style={styles.from}>
              <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Drop off Location</Text>
                      <Text style={styles.textStyle3}>adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>


              <View style={styles.from}>
            <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                     
                    />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Requested Date | Time</Text>
                      <Text style={styles.textStyle3}>adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>

              <View style={styles.from}>
            <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                    <View style={styles.distance}>

                    <View style={styles.distance1}>
                      <Text style={styles.textStyle}>Distance</Text>
                      <Text style={styles.textStyle3}>56KM</Text>
                      </View>

                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>    
              </View>


              <View style={styles.from}>
            <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Vehicle Type</Text>
                      <Text >adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>


              <View style={styles.from}>
            <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Fare</Text>
                      <Text style={styles.textStyle3}>adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>

              <View style={styles.from}>
            <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                    <View style={styles.location}>
                      <Text style={styles.textStyle}>Payment Method</Text>
                      <Text style={styles.textStyle3}>adsasdasdasdasdasasdda asdasdasdasd asdasdasdasdf asdasdasdasd</Text>
                      <Divider type="full-bleed" color={Colors.primaryColor}/>
                    </View>
                    
              </View>
           
          </ScrollView>

          <View style={styles.bottomButtonsContainer}>
            <Button
              onPress={this.navigateTo('Cart')}
              title={`Add  $${total.toFixed(2)}`}
              titleColor={Colors.onPrimaryColor}
              height={44}
              color={Colors.primaryColor}
              
              rounded
            />
          </View>
        </View>
        <SafeAreaView style={styles.bottomArea} />
      </Fragment>
    );
  }
}
