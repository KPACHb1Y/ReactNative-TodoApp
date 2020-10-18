import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';

import {THEME} from "../../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
      if (title.trim().length < 3) {
          Alert.alert('Error!', `Min length task 3 symbol. Now ${title.trim().length}`)
      } else {
          onSave(title);
      }
    };

    const cancelHandler =() => {
        setTitle(value);
        onCancel();
    };

    return(
        <Modal
            visible={visible}
            animationType='slide'
            transparent={false}
        >
            <View style={styles.modal}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Edit task...'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <View style={styles.button}>
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
                        Cancel
                    </AppButton>
                    <AppButton onPress={saveHandler}>
                        Save
                    </AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    button: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});