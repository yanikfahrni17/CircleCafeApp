import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <FormLabel>
          Name
        </FormLabel>
        <FormInput
          placeholder='Name'
        />
        <FormLabel>
          Email
        </FormLabel>
        <FormInput
          placeholder='Email'
        />
        <FormLabel>
          Passwort
        </FormLabel>
        <FormInput
          placeholder='Passwort'
        />
        <FormLabel>
          Passwort bestätigen
        </FormLabel>
        <FormInput
          placeholder='Passwort bestätigen'
        />
      <Button
        title="Anmelden"
        buttonStyle={{ marginTop: 20 }}
      />
      </ScrollView>
    );
  }
}

export default Settings;
