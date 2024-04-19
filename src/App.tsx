/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./navigation/TabNavigation.tsx";

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}

export default App;
