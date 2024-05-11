import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {
    const [nombre, setNombre] = useState('');
    const [fechaReserva, setFechaReserva] = useState(new Date());
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [clientes, setClientes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setFechaReserva(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const agregarCliente = () => {
        const nuevoCliente = {
            id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
            nombre: nombre,
            fechaReserva: fechaReserva,
            cantidadPersonas: cantidadPersonas,
        };
        setClientes([...clientes, nuevoCliente]);
        setNombre('');
        setFechaReserva(new Date());
        setCantidadPersonas(1);
        setModalVisible(false);
    };

    const eliminarCliente = (id) => {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Cliente"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cantidad de Personas"
                            keyboardType="numeric"
                            value={cantidadPersonas.toString()}
                            onChangeText={(text) => setCantidadPersonas(parseInt(text) || 1)}
                        />
                        <TouchableOpacity onPress={showDatepicker}>
                            <Text>Seleccionar fecha de Reserva</Text>
                        </TouchableOpacity>
                        <Text>Seleccionado: {fechaReserva.toLocaleString()}</Text>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={false}
                                onChange={onChange}
                                locale="es-ES"
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <Button title="Agregar Cliente" onPress={agregarCliente} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={clientes}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.clienteItem}>
                        <Text style={styles.clienteNombre}>ID: {item.id}</Text>
                        <Text style={styles.clienteNombre}>Nombre: {item.nombre}</Text>
                        <Text style={styles.clienteFecha}>Fecha de Reserva: {item.fechaReserva.toDateString()}</Text>
                        <Text style={styles.clienteFecha}>Cantidad de Personas: {item.cantidadPersonas}</Text>
                        <Button title="Eliminar" onPress={() => eliminarCliente(item.id)} color="red" />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001222',
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    clienteItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    clienteNombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clienteFecha: {
        fontSize: 16,
    },
});
