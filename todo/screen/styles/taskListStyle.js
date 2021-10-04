import { StyleSheet } from 'react-native';
import { DPW  } from '../../dp';
export const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerCont: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.3,
    marginBottom: 50,
  },
  headerText: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFrontContainer: {
    flex: 1,
  },
  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
    elevation: 4,
  },
  card: {
    shadowOpacity: 0.5,
    elevation: 3,
    height: 80,
    width: 330,
    alignSelf: 'center',
    padding: -10,
  },
  taskCont: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
  },
  task1st: {
    flexDirection: 'row',
  },
  taskName: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 22,
    width: 130,
    marginRight: 20,
  },

  taskPrior: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 22,
  },
  taskExp: {
    fontFamily: 'BMJUA',
    color: 'red',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  rowBack: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    height: 80,
    width: 300,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 80,

    borderRadius: 10,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    height: 80,

    right: 0,
  },
  separator: {
    height: 10,
    backgroundColor: '#AFEEEE',
    width: 300,
    borderRadius: 9,
    alignSelf: 'center',
  },
  underLine: {
    height: 10,
    backgroundColor: '#AFEEEE',
    width: '100%',
    borderRadius: 9,
    alignSelf: 'center',
  },
  bottomLine: {
    height: 10,
    backgroundColor: '#AFEEEE',
    width: '100%',
    borderRadius: 9,
    alignSelf: 'center',
    top: 590,
    position: 'absolute',
  },
  noTaskImg: { width: 600 * DPW, height: 700 * DPW, marginTop: 100 * DPW, opacity:0.5 },
  noTaskText:{
    marginTop: 200 * DPW,
    marginBottom: -100,
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 33,
  }
});
