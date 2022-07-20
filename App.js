import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ActivityIndicator, FlatList, Button, View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from "./components/screen";
import UpdateScreen from "./components/updatescreen";
import axios from 'axios';

function HomeScreen({ navigation }) {

  const [employeData, setEmployeData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    const fetchUsers = async () => {
      try {
        console.log("calling....")
        const response = await axios.get("https://crud-testing.vercel.app/api/employee");
        setLoading(false);
        setEmployeData(response.data.data)
      } catch (error) {
        console.log("error",error);
        alert(error);
        if (error.message == 'Request failed with status code 429') {
          fetchUsers();
        }
      }
    };

    fetchUsers();
  }, [])

  console.log('employeData=====',employeData)
  const Item = ({ data }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Update', {
          employee_id: data._id,
          employee_name: data.name,
          employee_age: data.age,
          employee_salary: data.salary,
        })}
      >
        <Text style={styles.title}
        >Name : {data.name}
        </Text>
        <Text style={styles.title}
        >Age : {data.age}
        </Text>
        <Text style={styles.title}
        >Salary : {data.salary}
        </Text>

      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item data={item} />
  );

  return (
    <>
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
        :
        <>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: 'black', padding: 15, fontSize: 20 }}>Employee Details</Text>
            <FlatList
              data={employeData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{ padding: 20, alignItems:'center' }}>
            <Button
              title="ADD Employee"
              onPress={() => navigation.navigate('Screen', {
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            />

          </View>
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#0000FF',
  },
  item: {
    backgroundColor: '#000',
    padding: 2,
    margin: 1,
    borderRadius: 2
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
});


function DetailsScreen({ route, navigation }) {

  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black' }}>Details Screenn</Text>
      <Text style={{ color: 'black' }}>itemId: {JSON.stringify(itemId)}</Text>
      <Text style={{ color: 'black', marginBottom: 10 }}>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Screen"
        onPress={() => navigation.navigate('Screen')}
      />
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen" component={Screen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;