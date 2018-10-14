import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Tile, Card, List, ListView, ListItem } from 'react-native-elements';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/de-ch';

class UserDetail extends Component {
  render() {
    const { FID, fb_eventname, fb_description, fb_start_time, fb_end_time, fb_location, fb_street, fb_zip, fb_city,fb_country, fb_image } = this.props.navigation.state.params;
    return (
      <ScrollView>
              <Card
        title={fb_eventname}
        image={({uri: fb_image})}>
        <Text style={{marginBottom: 10}}>{fb_description}
        </Text>
      </Card>
        <List>
        <ListItem
          title = "Datum"
          rightTitle = {<Moment element={Text} format="LL" locale="de-ch">{fb_start_time}</Moment>}
          hideChevron
          />
          <ListItem
          title = "Türöffnung"
          rightTitle = {<Moment element={Text} format="LT" locale="de-ch">{fb_start_time}</Moment>}
          hideChevron
          />
        </List>
      </ScrollView>


    );
  }
}

export default UserDetail;
