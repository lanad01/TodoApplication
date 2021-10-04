import { StyleSheet } from "react-native";
export 
const styles=StyleSheet.create({
      outside:{
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        borderWidth:3,
        borderRadius:13,
        borderColor:'#AFEEEE'
      },
      validModal:{
        width:300,
        height:350,
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        
      },
      modalHeader:{
        fontFamily:'BMJUA',
        fontSize:32,
        color:'black',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        marginBottom:10,
      },
      category:{
        color: 'black',
        fontFamily: 'BMJUA',
        fontSize: 20,
        width:90,
      },
      category2:{
        color: 'black',
        fontFamily: 'BMJUA',
        fontSize: 20,
        width:90,
        marginTop:15,
      },
      taskInput:{
        width: 150,
        height: 45,
        bottom:10,
        paddingLeft:10,
        backgroundColor: '#AFEEEE',
        borderRadius: 7,
        fontFamily:'BMJUA',
      },
      picker:{
        width: 160,
        height: 50,
        backgroundColor: '#AFEEEE',
        marginLeft: 5,
        marginBottom:10,
      },
      opacity:{
        backgroundColor: '#afeeee',
        borderWidth: 4,
        borderColor: 'white',
        marginLeft: 5,
        borderRadius:5,
        borderColor:'black',

      },
      expBtn:{
        fontFamily: 'BMJUA',  
        fontSize: 19,
        color: 'black',
        justifyContent: 'center',
        marginTop:5,
        
      },
      expInput:{
        backgroundColor: '#afeeee',
        marginLeft: 10,
        width: 160,
        height: 40,
        borderRadius: 5,
        fontFamily: 'BMJUA',
        fontSize: 14,
        color: '#191970',
        paddingLeft:12,
      },
      validText:{
        width:240,
        fontFamily:'BMJUA',
        fontSize:18,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
      },  
      pwdInput:{
        borderWidth:4,
        width:200,
        height:40,
        borderRadius:10,
        textAlign:'center',
        marginTop:10
      },
      choicebox:{
        alignItems:'center',
        marginTop:15,
      }, 
      photochoose:{
        textAlign:"center",
        fontFamily:"BMJUA",
        fontSize:23,
        backgroundColor:'white',
        borderRadius:7,
        borderWidth:5,
        width:100,
        borderWidth:5,
        paddingTop:10,
        margin:5
        
      },
})