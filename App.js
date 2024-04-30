import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { useState } from 'react';


export default function App() {

    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    const handleTaskChange = (text) => {
        setTask(text);
    };

    const handleAddTask = () => {
        if (task.trim() !== '') {
            setTasksList([...tasksList, task]);
            setTask('');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Lista de Tareas</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Ingrese una tarea"
                value={task}
                onChangeText={handleTaskChange}
            />
            <Button title="Agregar Tarea" onPress={handleAddTask} />
            <FlatList
                style={{ marginTop: 20 }}
                data={tasksList}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, marginRight: 10 }}>{'\u2022'}</Text>
                        <Text style={{ fontSize: 18 }}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
