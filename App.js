/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import WalletConnectProvider, { 
  useWalletConnect 
} from 'react-native-walletconnect';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { getAppInfo } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          <View
            style={styles.walletConnect}
          >
              <WalletConnectProvider >
                <WalletConnectExample />
              </WalletConnectProvider>
            
          </View>

          {/* <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WalletConnectExample = () => {
  const {
    createSession,
    killSession,
    session,
    signTransaction,
  } = useWalletConnect();
  const hasWallet = !!session.length;
  return (
    <>
      {!hasWallet && (
        <Button title="Connect" onPress={createSession} />
      )}
      {!!hasWallet && (
        <Button
          title="Sign Transaction"
          onPress={() => signTransaction({
            from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
            to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
            data: "0x",
            gasPrice: "0x02540be400",
            gas: "0x9c40",
            value: "0x00", 
            nonce: "0x0114",
          })}
        />
      )}
      {!!hasWallet && (
        <Button
          title="Disconnect"
          onPress={killSession}
        />
      )}
    </>
  );
};


const styles = StyleSheet.create({
  walletConnect: {
    paddingTop: 100,
    width: window.width,
    height: 700,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
