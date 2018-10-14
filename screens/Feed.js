import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/de-ch';

import {
  AppRegistry,
  ActivityIndicator,
  ListView,
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';


Moment.globalLocale = 'de-ch';
var now = new Date();

class Feed extends Component {

constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    refreshing: false,
  }
}

componentDidMount() {
  this.fetchData();
}

componentDidUpdate(){
  this.fetchData();
};



_onRefresh() {
  this.setState({refreshing: true});
  this.fetchData();
}

fetchData(){
  fetch('https://circlecafe.ch/EventList')
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
      isLoading: false,
      dataSource: responseJson,
      refreshing: false,
    }, function() {
      // In this block you can do something with new state.
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}

onLearnMore = (item) => {
  this.props.navigation.navigate('Details', {...item});
};

renderEventItemFuture = (item, key) => {
var eventDate = moment(`${item.fb_end_time}`).format("YYYY-MM-DD");
var uptodate = moment({now}).format("YYYY-MM-DD");
if ( eventDate >= uptodate){
    return(
          <ListItem
            roundAvatar
            avatar={{uri: item.fb_image}}
            avatarStyle={{borderRadius:100, height:32, width:32 }}
            key={key}
            title={item.fb_eventname}
            subtitle={<Moment style={styles.subtitleView} element={Text} format="LLLL" locale="de-ch">{item.fb_start_time}</Moment>}
            onPress={() => this.onLearnMore(item)}
          />
    )
  }
}
renderEventItemPast = (item, key) => {
  var eventDate = moment(`${item.fb_end_time}`).format("YYYY-MM-DD");
  var uptodate = moment({now}).format("YYYY-MM-DD");
  if ( eventDate < uptodate){
      return(
            <ListItem
              roundAvatar
              avatar={{uri: item.fb_image}}
              avatarStyle={{borderRadius:100, height:32, width:32 }}
              key={key}
              title={item.fb_eventname}
              subtitle={<Moment style={styles.subtitleView} element={Text} format="LLLL" locale="de-ch">{item.fb_start_time}</Moment>}
              onPress={() => this.onLearnMore(item)}
            />
      )
    }
  }  
handleClick = () => {
  this.setState({
      collapse: !this.state.collapse
  })
}

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 250}}>
          <ActivityIndicator />
        </View>
      );
    }
    
    return (

      <ScrollView
      dataSource={this.state.dataSource}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }
    >
         
      <List>
           {this.state.dataSource.map(this.renderEventItemFuture)}
       </List>
    
      <TouchableHighlight
         style={styles.button}
         onPress={this.handleClick}
        >
        <Text> Vergangene Events anzeigen</Text>
      </TouchableHighlight>
        {
          this.state.collapse ?
        <List>
          {this.state.dataSource.map(this.renderEventItemPast).reverse()}
        </List>
        : null
        }
      
    </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10
    
    },
    rowViewContainer: {
      fontSize: 16,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    subtitleView: {
      paddingLeft:10
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 15,
      borderBottomColor: '#333',
      height: 50,
    }
});

export default Feed;
