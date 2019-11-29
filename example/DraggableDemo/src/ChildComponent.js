/**
 *	* https://github.com/tongyy/react-native-draggable
 *
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A Custom Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: '#313131',
    padding: 20,
  },
  text: {
    padding: 10,
    color: '#f1f1f1f1',
  },
});
