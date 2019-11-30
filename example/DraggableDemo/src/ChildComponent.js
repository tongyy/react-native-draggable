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
      <View style={styles.child}>
        <Text style={styles.text}>And a child outside of the bounds</Text>
        <Text style={styles.text}>And his sibling</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131',
    padding: 5,
  },
  text: {
    padding: 10,
    color: '#f1f1f1f1',
  },
  child: {
    flexDirection: 'row',
  }
});
