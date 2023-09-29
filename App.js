import { Text, StyleSheet, View, Image, Pressable, Switch, useColorScheme } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [bellImageOpacity, setBellImageOpacity] = useState(1);
  const [darkMode, setDarkMode] = useState(useColorScheme() === "dark");

  const toggleDarkMode = async () => {
    try {
      setDarkMode(!darkMode);
      await AsyncStorage.setItem("darkMode", darkMode ? "false" : "true");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const darkMode = await AsyncStorage.getItem('darkMode');
        if (darkMode === null) return;
        setDarkMode(darkMode === "true");
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handlePressIn = async () => {
    setBellImageOpacity(0.5);
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('./assets/sound/ding.mp3'),
        { shouldPlay: true }
      );
      console.debug("Ding!");
    } catch (error) {
      console.error(`An error occurred when attempting to ding: ${error}`);
    }
  };

  const handlePressOut = async () => {
    setBellImageOpacity(1);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#1c1c1c" : "#fff" }]}>
      <Switch
        value={darkMode}
        onValueChange={toggleDarkMode}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
        style={styles.themeToggle}
      />
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Image source={require('./assets/img/bell.png')} style={{ width: 350, height: 350, opacity: bellImageOpacity }} resizeMode='contain' />
      </Pressable>
      <Text style={[styles.bellText, { color: darkMode ? "#fff" : "#1c1c1c" }]}>Press to ding!</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellText: {
    fontSize: 32,
    padding: 16
  },

  themeToggle: {
    position: "absolute",
    top: 20,
    right: 20
  }
});
