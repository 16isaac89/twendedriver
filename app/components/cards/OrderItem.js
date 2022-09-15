/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, View} from 'react-native';

// import components
import Button from '../buttons/Button';
import {Caption, Subtitle1, Subtitle2} from '../text/CustomText';
import Divider from '../divider/Divider';
import TouchableItem from '../TouchableItem';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// OrderItem Config

// OrderItem Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginBottom: 7,
    marginHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.background,
  },
  content: {
    width: Layout.SCREEN_WIDTH - 2 * 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderNumber: {
    paddingBottom: 2,
    fontWeight: 'bold',
    color: Colors.primaryColorDark,
    textAlign: 'left',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  pv8: {
    paddingVertical: 8,
  },
  itemContainer: {
    marginVertical: 4,
    backgroundColor: Colors.background,
  },
  item: {
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
    marginBottom:20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  extraSmallButton: {
    width: 116,
    height: 34,
  },
  status: {
    textAlign: 'left',
  },
  onTheWay: {
    color: Colors.tertiaryColor,
    textAlign: 'left',
  },
  pending: {
    color: Colors.secondaryColor,
    textAlign: 'left',
  },
  delivered: {
    color: Colors.primaryColor,
    textAlign: 'left',
  },
});



// OrderItem Props
type Props = {
  onPress: () => {},
  activeOpacity: number,
  orderNumber: number,
  orderDate: string,
  orderItems: Array,
  orderStatus: string,
  orderFrom:String,
  orderTo:String,
  orderprice:string
};

// OrderItem
const OrderItem = ({
  onPress,
  activeOpacity,
  orderNumber,
  orderDate,
  orderItems,
  orderStatus,
  orderFrom,
  orderTo,
  orderprice
}: Props) => (
  <TouchableItem onPress={onPress} activeOpacity={activeOpacity} style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Subtitle2
            style={styles.orderNumber}>{`Order #${orderNumber}`}</Subtitle2>
          <Caption>{orderDate}</Caption>
        </View>
        <View style={styles.flexEnd}>
          <Subtitle1>{`UGX ${orderprice}`}</Subtitle1>
        </View>
      </View>

      <Divider type="middle" color={Colors.primaryColor}/>

      <View style={styles.pv8}>
     
              <View style={styles.item}>
                 <Subtitle1>From: {orderFrom}</Subtitle1>
              </View>
              <View style={styles.item}>
              <Subtitle1>To:    {orderTo}</Subtitle1> 
              </View>
        
      </View>

      {orderStatus === 'on-the-way' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.onTheWay}>On the way</Subtitle2>
          </View>

          <Button
            color={Colors.primaryColor }
            title="Track"
            titleColor={Colors.white}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}

      {orderStatus === 'pending' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.pending}>Pending delivery</Subtitle2>
          </View>

          <Button
            color={Colors.primaryColor }
            title="Cancel"
            titleColor={Colors.white}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}

      {orderStatus === 'delivered' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.delivered}>Delivered</Subtitle2>
          </View>

          <Button
            color={Colors.primaryColor }
            title="Reorder"
            titleColor={Colors.white}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}
    </View>
  </TouchableItem>
);

export default OrderItem;
