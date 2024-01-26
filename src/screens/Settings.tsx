import { View, Text ,StyleSheet, StatusBar} from 'react-native';

import React from 'react';
import ScreenLayout  from '../components/ScreenLayout';

const Settings = () => {

    return (
        <ScreenLayout> 
            <View>
            <Text>Ajustes</Text>
        </View>
        </ScreenLayout>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C2A',
        flex: 1,
        marginTop: StatusBar.currentHeight,
        padding: 10,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
    });
export default Settings;