import React from 'react';
import { View , StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Library from './src/screens/Library';
import Settings from './src/screens/Settings';
import TabComponent from './src/components/Tab'
import Search from './src/screens/Search';
import PlayerLayout from './src/components/PlayerLayout';
import { PlayerProvider } from './src/context/PlayerContext';
import { initSetupPlayer } from './Services';

const Tab = createBottomTabNavigator();
const ScreenHeight = Dimensions.get("screen").height - Dimensions.get("window").height;

function App() {
  initSetupPlayer();

  /*
    TODO:
    - Verificar el doble renderizado de player al usar una propiedad de PlayerContext
    - Hacer validaciones de undefined para vibrant, dark, url
    - El player debe cargar indiferentemente de la url
    - En caso la canción esté cargando, debe mostrar una animación en el botón de play.
  */
  NavigationBar.setPositionAsync('absolute')
  NavigationBar.setBackgroundColorAsync('#00000000');

  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
  StatusBar.setBarStyle('light-content', true);

  return (
    <View style={{ flex: 1, backgroundColor: '#262639' }}>
      <PlayerProvider>
        <AppContent/>
      </PlayerProvider>
    </View>);
}
function AppContent(){
  return (
    <NavigationContainer>
      <PlayerLayout/>

      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          flex: 1,
          alignItems: 'center',
          paddingTop: 0,
          width: '100%',
          height: ScreenHeight + 23,
          backgroundColor: '#262639', 
          borderTopWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        }
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
              tabBarButton: (props) => 
              <TabComponent
                focusedIcon="home"
                unfocusedIcon="home-outline"
                label="home" 
                {...props} />,
            }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
              tabBarButton: (props) => 
              <TabComponent 
                unfocusedIcon="search-outline"
                focusedIcon="search-sharp"
                label="search" {...props} />,
            }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
              tabBarButton: (props) => 
              <TabComponent 
              unfocusedIcon="podium-outline"
              focusedIcon="podium"
              label="library" {...props} />,
            }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
              tabBarButton: (props) => 
              <TabComponent 
              unfocusedIcon="settings-outline"
              focusedIcon="settings"
              label="settings" {...props} />,
            }}
        />
        
      </Tab.Navigator>
      </NavigationContainer>
  )
}



export default App


