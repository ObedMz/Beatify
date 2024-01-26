import React, { useEffect } from 'react';
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
  useEffect(() => {
    initSetupPlayer();
    NavigationBar.setPositionAsync('absolute');
    NavigationBar.setBackgroundColorAsync('#00000000');

    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content', true);
  }, []);

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
            options={createTabOptions('home-outline', 'home', 'home')}/>
        <Tab.Screen
            name="Search"
            component={Search}
            options={createTabOptions('search-outline', 'search-sharp', 'search')}/>
        <Tab.Screen
            name="Library"
            component={Library}
            options={createTabOptions('podium-outline', 'podium', 'library')}/>
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={createTabOptions('settings-outline', 'settings', 'settings')}/>
        
      </Tab.Navigator>
      </NavigationContainer>
  )
}

type TabOptions = {
  tabBarButton: (props: any) => JSX.Element;
};

const createTabOptions = (
  unfocusedIcon: string,
  focusedIcon: string,
  label: string
): TabOptions => ({
  tabBarButton: (props) => (
    <TabComponent
      unfocusedIcon={unfocusedIcon}
      focusedIcon={focusedIcon}
      label={label}
      {...props}
    />
  ),
});

export default App


