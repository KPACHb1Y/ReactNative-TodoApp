import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';

import {TodoContext} from './TodoContext';
import {todoReducer} from "./todoReducer";
import {ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/screenContext";

export const TodoState = ({ children }) => {
    const {changeScreen} = useContext(ScreenContext);
    const initialState = {
        todos: [],
        loading: false,
        error: null
    };

    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        const response = await fetch('https://rn-todo-app-30efd.firebaseio.com/todos.json', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({title})
        });
        const data = await response.json();
        console.log(data);
        dispatch({type: ADD_TODO, title, id: data.name});
    };

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            'Remove Element',
            `Are you sure you want to delete the "${todo.title}" ?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({type: REMOVE_TODO, id});
                    }
                },
            ],
            {cancelable: false},
        );
    };

    const fetchTodos = async () => {
      const response = fetch('https://rn-todo-app-30efd.firebaseio.com/todos.json', {
          method: 'GET',
          headers: {'Content-type': 'application/json'}
      });
        const data = await response.json();
        console.log(`Data ${data}`);
    };

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = error => dispatch({type: SHOW_ERROR, error});

    const clearError = () => dispatch({type: CLEAR_ERROR});

    return(
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos
        }}>
            {children}
        </TodoContext.Provider>
    );
};