import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';

import {AddTodo} from "../Components/AddTodo";
import {Todo} from "../Components/Todo";
import {THEME} from "../../theme";
import {TodoContext} from "../Context/todo/TodoContext";
import {ScreenContext} from "../Context/screen/screenContext";

export const MainScreen = () => {
    const {addTodo, todos, removeTodo} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
    const [widthDevice, setWidthDevice] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setWidthDevice(width);
        };

        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    });

    let content = (
        <View style={{ width: widthDevice }}>
            <FlatList
                keyExtractor={item => item.id}
                data={todos}
                renderItem={({ item }) => (
                    <Todo
                        todo={item}
                        key={item.id}
                        onRemove={removeTodo}
                        onOpen={changeScreen} />
                )}
            />
        </View>
    );

    if (todos.length === 0) {
        content = (
        <View style={styles.imageWrap}>
            <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../../assets/no-items.png')} // local image source
            />
        </View>
        );
    }

    return(
        <View>
            <AddTodo onSubmit={addTodo}/>
            { content }
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        padding: 10
    },
    image: {
        width: '100%',
        // height: '100%'
    }
});