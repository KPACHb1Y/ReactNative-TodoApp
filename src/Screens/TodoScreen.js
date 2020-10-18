import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import {AntDesign, FontAwesome} from '@expo/vector-icons';

import {THEME} from '../../theme';
import {AppCard} from "../Components/ui/AppCard";
import {EditModal} from "../Components/EditModal";
import {AppTextBold} from "../Components/ui/AppTextBold";
import {AppButton} from "../Components/ui/AppButton";
import {TodoContext} from "../Context/todo/TodoContext";
import {ScreenContext} from "../Context/screen/screenContext";

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    const [modal, setModal] = useState(false);

    const todo = todos.find(t => t.id === todoId);

    const saveHandler = title => {
      updateTodo(todo.id, title);
      setModal(false);
    };

    return (
        <View>
            <EditModal
                visible={modal}
                onCancel={() => setModal(false)}
                value={todo.title}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)} >
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                        <AntDesign name='back' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name='remove' size={20} color='#fff'/>
                    </AppButton>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
      //width: Dimensions.get('window').width / 2.5 // class for adaptive styles
        width: Dimensions.get('window').width > 400 ? 150 : 140
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    title: {
        fontSize: 20
    }
});