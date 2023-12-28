//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateScaleVertical } from '../styles/responsiveSize';

// create a component
const WrapperComp = ({
    children
}) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.whiteColor,
        paddingHorizontal:moderateScale(20)
       
    },
});

//make this component available to the app
export default WrapperComp;
