import React, {useContext} from 'react';
import {View, StyleSheet, Alert} from "react-native";

import {Navbar} from "./Components/Navbar";
import {THEME} from "../theme";
import {MainScreen} from "./Screens/MainScreen";
import {TodoScreen} from "./Screens/TodoScreen";
import {ScreenContext} from "./Context/screen/screenContext";

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);

    return(
      <View>
          <Navbar title='Todo App'/>
          <View style={styles.container}>
              { todoId ? <TodoScreen /> : <MainScreen/> }
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
});