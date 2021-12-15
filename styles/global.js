import { StyleSheet, Dimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    
    image: {
      flexGrow: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    
    logo: {
      marginTop: -(0.05 * Dimensions.get("window").width),
      width: 0.2 * Dimensions.get("window").width,
      height: 0.2 * Dimensions.get("window").width
    },

    containerCenter: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'center'
    },
  
    containerSubtitles: {
        marginTop: 0.325 * Dimensions.get("window").height,
        marginLeft: 0.08 * Dimensions.get("window").width
    },

    containerButton: {
        marginLeft: 0.6 * Dimensions.get("window").width,
        marginTop: 0.225 * Dimensions.get("window").height,
        marginRight: 0.07 * Dimensions.get("window").width
    },

    gapBetweenButton: {
        paddingTop: 0.02 * Dimensions.get("window").height,
    },
  
    textTitle: {
      fontFamily: "nunito-regular",
      color: "black",
      opacity: 0.6,
      fontSize: 36,
      textAlign: "left"
    },
  
    textSubtitle: {
      fontFamily: "nunito-light",
      fontStyle: "italic",
      color: "black",
      opacity: 0.6,
      fontSize: 14,
      textAlign: "left"
    },

    containerRegister: {
      marginTop: 220,
      marginLeft: 40,
      paddingRight: 63
    },

    textRegister: {
      fontFamily: "nunito-bold",
      color: "white",
      fontSize: 36,
      textAlign: "left"
    },

    errorText: {
      fontFamily: "nunito-light",
      color: "red",
      paddingLeft: 10,
      fontSize: 12,
      fontStyle: 'italic',
    },

    inputRegister: {
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 1,
      padding: 10,
      marginTop: 10,
      width: "100%",
      height: 50,
      color: "white"
    },

    inputLogin: {
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      marginRight: 10,
      width: "100%",
      height: 50,
      color: "white"
    },

    containerVerification: {
      marginTop: 350,
      marginLeft: 40,
      paddingRight: 63
    },

    containerLogin: {
      marginTop: 350,
      paddingLeft: 40,
      paddingRight: 40,
      paddingBottom: 50
    },
  
  });