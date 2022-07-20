
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';

function Screen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [profile, setprofile] = useState('');

  console.log("name", name);
  console.log("age", age);
  console.log("salary", salary);

  const submitForm = async() =>{
    console.log("Submitting");
    // alert("Submitting")
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://dummy.restapiexample.com/api/v1/create',
        data: {
          name: name,
          salary: salary,
          age: age
        }
      });
      console.log("response",response.data)
      alert("Submitted")
    } catch (error) {
        console.log('cancelled', error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.formLabel}>Add Employee</Text>

      <View >
        <TextInput
          placeholder="Enter Names" style={styles.inputStyle}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter Age"
          style={styles.inputStyle}
          onChangeText={(text) => setAge(text)} />
        <TextInput
          placeholder="Enter Salary"
          style={styles.inputStyle}
          onChangeText={(text) => setSalary(text)} />
      </View>
      <View style={{ margin: 20, display: 'flex', flexDirection: 'row' }}>
        <View style={{marginRight:20}}>
          <Button
            style={{ padding: 20 }}
            title="Go back"
            onPress={() => navigation.goBack()}

          />
        </View>
        <View>
          <Button
            title="Submit"
            onPress={() => submitForm()}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  formLabel: {
    fontSize: 20,
    color: '#000',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Screen;