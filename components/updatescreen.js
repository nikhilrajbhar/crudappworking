
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';

function UpdateScreen({ route, navigation }) {

  const { employee_id, employee_name, employee_age, employee_salary } = route.params;
  console.log('paramsw',route.params)
  console.log('route.params',route.params)
  const [name, setName] = useState(employee_name);
  const [age, setAge] = useState(JSON.stringify(employee_age));
  const [salary, setSalary] = useState(JSON.stringify(employee_salary));
  const [profile, setprofile] = useState('');

  const submitForm = async() =>{
    console.log("Submitting");
    // alert("Submitting")
    try {
      const response = await axios({
        method: 'PUT',
        url: `https://crud-testing.vercel.app/api/updateEmployee/${employee_id}`,
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
      <Text style={styles.formLabel}>Update Employee</Text>

      <View >
        <TextInput
          placeholder="Enter Names" style={styles.inputStyle}
          value={name}
          onChangeText={(text) => setName(text)}

        />
        <TextInput
          placeholder="Enter Age"
          value={age}
          style={styles.inputStyle}
          onChangeText={(text) => setAge(text)} />
        <TextInput
          placeholder="Enter Salary"
          value={salary}
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
            title="Update"
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

export default UpdateScreen;