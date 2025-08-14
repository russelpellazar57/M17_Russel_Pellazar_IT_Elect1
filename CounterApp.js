// CounterApp.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <Button title="Increment +1" onPress={() => setCount(c => c + 1)} />
        <View style={{ width: 12 }} />
        <Button title="Decrement -1" onPress={() => setCount(c => c - 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  count: { fontSize: 48, fontWeight: 'bold', marginVertical: 24 },
  row: { flexDirection: 'row' },
});