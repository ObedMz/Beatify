import React from 'react';

import ScreenLayout  from '../components/ScreenLayout';
import { ScrollView, View, Text ,StyleSheet, StatusBar} from 'react-native';

function Home() {
  return (
    <ScreenLayout> 
      <View>
      <Text style={styles.text}>Buenas Noches</Text>
    </View>
    <ScrollView>
        <View style={styles.container}>
          {Array.from({ length: 50 }, (_, i) => (
            <Text key={i} style={styles.text}>
              Test #{i + 1}
            </Text>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C2A',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    fontSize: 25,
    color:'white',
    fontWeight: '700',
  },
});

export default Home;