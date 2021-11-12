import { StyleSheet } from 'react-native';

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
  
    },

    containerCenter: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'center'
    },
  
    containerSubtitles: {
        marginTop: 170,
        marginLeft: 40,
        paddingTop: 30
    },

    containerButton: {
        marginLeft: 250,
        marginTop: 160,
        marginRight: 30
    },

    gapBetweenButton: {
        paddingTop: 15
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

    inputRegister: {
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      width: 309,
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
      marginLeft: 40,
      paddingRight: 63
    },
  
  });