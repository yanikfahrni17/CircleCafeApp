import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, FlatList, View, Text, RefreshControl, ListView } from 'react-native';
import { Card, Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds,
      isLoading: true,
    }
  }
  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

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
  _onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  render() {
    return (

      <ScrollView>
      <Tile
        imageSrc={{ uri: this.props.picture.large}}
        featured
        title={`${this.props.name.first.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
        caption={`${this.props.location.street}, ${this.props.location.city}`}
      />
      <Card
        title="Circle Café mieten"
        image={{ uri: this.props.picture.rent}}
      >
      <Text>Planen Sie einen Event und möchten den Gewölbekeller mieten? Wir helfen Ihnen gerne dabei! Auf unserer Webseite finden Sie alle Informationen dazu. Falls Sie Fragen haben stehen wir Ihnen über die unten aufgelisteten Kanäle gerne zur Verfügung.</Text>
      </Card>

      <List>
      <ListItem
          title="Webseite"
          rightTitle={this.props.web}
          hideChevron
        />
        <ListItem
          title="Email"
          rightTitle={this.props.email}
          hideChevron
        />
        <ListItem
          title="Telefon"
          rightTitle={this.props.phone}
          hideChevron
        />
      </List>
      <Card
        title="Beerpong Turniere und Open Mic Konzerte"
        image={{ uri: this.props.picture.event}}
      >
      <Text>Wir organisieren immer wieder Beerpong Turniere, Kostümpartys und verschiedenste Konzerte. Das wichtigste dabei ist, dass unsere Gäste dabei Spass haben. Darum freuen wir uns über Ideen und Vorschläge immer sehr! Falls Ihr einen Abend mitorganisieren möchtet oder einfach eine coole Idee habt, lasst es uns wissen!</Text>
      </Card>
      <List>
      <ListItem
          title="Name"
          rightTitle={`${this.props.name.first} ${this.props.name.last}`}
          hideChevron
        />
        <ListItem
          title="Strasse"
          rightTitle={this.props.location.street}
          hideChevron
        />
        <ListItem
          title="Ort"
          rightTitle={this.props.location.city}
          hideChevron
        />
        <ListItem
          title="Land"
          rightTitle={this.props.location.country}
          hideChevron
        />
      </List>
    </ScrollView>
    );
  }
}

/* Button für Weiterentwicklung mit LoginScreen = Screen ist schon vorhanden
<Button
title="Login"
buttonStyle={{ marginTop: 20 }}
onPress={this.handleSettingsPress}
/>
*/
Me.defaultProps = { ...me };

export default Me;
