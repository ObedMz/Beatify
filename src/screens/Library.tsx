import {  View, Text ,StyleSheet, StatusBar} from 'react-native';
import ScreenLayout  from '../components/ScreenLayout';

import React from 'react';

const Library = () => {
    return (
        <ScreenLayout> 
            <View>
            <Text>Library</Text>
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
export default Library;