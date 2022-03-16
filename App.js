import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; 
import { Nazionale } from './components/Nazionale';
import { Provinciale } from './components/Provinciale';
import { Regionale } from './components/Regionale';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCity, faBuilding, faHouse } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Nazionale" screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Nazionale') {
              iconName = faCity;
            } else if (route.name === 'Regionale') {
              iconName = faBuilding;
            } else {
              iconName = faHouse;
            }
            return <FontAwesomeIcon icon={ iconName } size={size} color={color} />
          }
        })}>
        <Tab.Screen name="Nazionale" component={Nazionale} />
        <Tab.Screen name="Regionale" component={Regionale} />
        <Tab.Screen name="Provinciale" component={Provinciale}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
