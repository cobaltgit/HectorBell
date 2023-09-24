import { Component } from 'react';
import { Text, StyleSheet, View, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { bellImageOpacity: 1 };
  }

  async handlePressIn() {
    this.setState({ bellImageOpacity: 0.5 });
    try {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        require('./assets/sound/ding.mp3'),
        { shouldPlay: true }
      );
      console.debug("Ding!", this.state);
    } catch (error) {
      console.error(`An error occurred when attempting to ding: ${error}`);
    }
  }

  async handlePressOut() {
    this.setState({ bellImageOpacity: 1 });
  }

  render() {
    return (
      <View style={styles.container} >
        <Pressable onPressIn={this.handlePressIn.bind(this)} onPressOut={this.handlePressOut.bind(this)}>
          <Image source={require('./assets/img/bell.png')} style={{ width: 350, height: 350, opacity: this.state.bellImageOpacity }} resizeMode='contain' />
        </Pressable>
        <Text style={styles.bellText}>Press to ding!</Text>
      </View>
    );
  }
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
  }
});
