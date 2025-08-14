// App.js
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import CounterApp from './CounterApp';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <CounterApp />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  card: { flex: 1, margin: 16, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e5e7eb' },
});

// App.js
import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import CounterApp from './CounterApp';
import ColorChangerApp from './ColorChangerApp';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardTall}>
          <CounterApp />
        </View>
        <View style={styles.spacer} />
        <View style={styles.cardTall}>
          <ColorChangerApp />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  cardTall: { height: 320, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e5e7eb' },
  spacer: { height: 24 },
});