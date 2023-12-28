//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,TextInput} from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';
import colors from '../styles/colors';

// create a component
const TextInputComp = ({
    value='',
    onChangeText,
    placeholder ='',
    placeholderTextColor = colors.whiteColorOpacity70,
    secureText=false,
    onPressSecure=()=>{},
    inputStyle={},
    textStyle={},
    ...props
   
}) => {
     
    return (
        <View style={{...styles.inputStyle,...inputStyle}}>
            <TextInput 
            style={{...styles.textStyle,...textStyle}}
            value={value}
            onChangeText={onChangeText }
            placeholder={placeholder}
            placeholderTextColor={colors.blackColor}
            {...props}
            
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
   inputStyle: {
        height:moderateScale(52),
        borderRadius:moderateScale(8),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:moderateScale(16),
        alignItems:'center',
        backgroundColor:colors.gray2,
        marginBottom:moderateScaleVertical(16)
    },
    textStyle:{
        fontSize:textScale(14),
        flex:1,
        color:colors.blackColor
       
    }
});

//make this component available to the app
export default TextInputComp;
