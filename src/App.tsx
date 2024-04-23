/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation.tsx";
import {GestureHandlerRootView} from "react-native-gesture-handler";

function App(): React.JSX.Element {

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
              <TabNavigation />
          </NavigationContainer>
      </GestureHandlerRootView>

  );
}

export default App;
