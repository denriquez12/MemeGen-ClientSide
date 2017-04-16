import React, { PropTypes, Component } from 'react';
//import Nav from './Nav';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  Navigator,
  View
} from 'react-native';
let ds;
class MyMeme extends Component {
  constructor(props){
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

componentDidMount(){
  fetch('http://localhost:3000/return_all.json')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({dataSource: ds.cloneWithRows(responseJson.memes)})
      console.log(responseJson.memes);
    //  return responseJson.url;

    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>Hello</Text>}
          />
        </View>
        <View style={styles.navBttnsWrapper}>
          {this.startHomeBttn()}
          {this.startMyMemeBttn()}
        </View>
      </View>
    );
  }

  startHomeBttn() {
    return(
      <TouchableOpacity style={styles.homeBttn} onPress={() => this.props.navigator.pop()}>
        <Text style={styles.text}>
          Home
        </Text>
      </TouchableOpacity>
    );
  }
  startMyMemeBttn(){
    return(
      <TouchableOpacity style={styles.myMemeBttn}>
        <Text style={styles.text}>
          MyMeme
        </Text>
      </TouchableOpacity>
    );
  }
} // End of Main

  let styles = StyleSheet.create({
    /////////////////////////
    ///// Section Styles ////
    /////////////////////////
    container: {
      flex: 1,
      backgroundColor: '#D7CEC7'
    },
    listWrapper: {
      flex: 12,
      paddingTop: 22,
      paddingLeft: 4
    },
    navBttnsWrapper: {  //Yellow
      flexDirection: 'row',
      flex: 1,
      alignItems: 'stretch',
    },
    img: {
      height: 40,
      width: 40,
      backgroundColor: 'black'
    },
    /////////////////////////
    //// Button styles //////
    /////////////////////////
    homeBttn: {
      flex: 1,
      borderWidth: 2,
      borderRightWidth: 1,
      backgroundColor: '#C09F80',
      alignItems: 'center',
      justifyContent: 'center'
    },
    myMemeBttn: {
      flex: 1,
      borderWidth: 2,
      borderLeftWidth: 1,
      backgroundColor: '#C09F80',//#565656',//#C09F80',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: 'white'
    }

  });

export default MyMeme