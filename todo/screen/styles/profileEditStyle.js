import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    flex: 1,
    
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 200,
  },
  bottomContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '64%',
  },
  categories: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 20,
  },
  text: {
    textAlign: 'left',
    fontFamily: 'BMJUA',
    color: 'gray',
    fontSize: 13,
    opacity: 0.4,
  },
  input: {
    width: 300,
    marginTop: -9,
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 20,
  },
  inputUnderLine: {
    width: 300,
    backgroundColor: 'gray',
    height: 3,
    opacity: 0.4,
    marginTop: -7,
  },
  pwdChange: {
    marginTop: 40,
  },
  pwdChangeText: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 23,
  },
  editBox: {
    backgroundColor: '#191970',
    margin: 30,
    height: 40,
    width: 100,
    borderColor: '#191970',
    borderWidth: 3,
  },
  editText: {
    textAlign: 'center',
    fontFamily: 'BMJUA',
    marginTop: 4,
    marginRight: 3,
    color: 'white',
    fontSize: 23,
  },
  btn:{
    textAlign:'center',
    width:230,
    alignItems:'center',
    fontFamily:"BMJUA",
    fontSize:30,
    color:'#191970',
    marginTop:4,
    paddingTop:10,
    borderWidth:5,
    borderColor:'#191970',
    borderRadius:30,
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
    width:250,
    height:50,
    borderColor:'white',
    borderWidth:5,
    paddingTop:10,
  },
  profile:{
    width: 190,  
    height: 180,
    marginTop: -60,  
    borderRadius: 60,
    borderWidth: 5,
    borderColor: 'powderblue',
    
  },
  backBtnView:{
    flexDirection:'row', 
    justifyContent:'flex-start',
    alignSelf:'flex-start'
  },
  backImg:{
    width:60, 
    height:60, 
    marginTop:10, 
    marginLeft:15
  },
});