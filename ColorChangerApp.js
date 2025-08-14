// ColorChangerApp.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ColorChangerApp() {
  const [bg, setBg] = useState('#ffffff'); // default white

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={styles.title}>Color Changer App</Text>

      <View style={styles.row}>
        <Button title="White" onPress={() => setBg('#ffffff')} />
        <View style={{ width: 12 }} />
        <Button title="Light Blue" onPress={() => setBg('#dbeafe')} />
        <View style={{ width: 12 }} />
        <Button title="Light Green" onPress={() => setBg('#dcfce7')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row' },
});