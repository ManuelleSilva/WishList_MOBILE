import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cadastrar({ navigation }) {

    const [nomeWish, setnomeWish] = useState(null);
    const [valorWish, setvalorWish] = useState(null);
    const [dataWish, setdataWish] = useState(null);
    const [validWish, setvalidWish] = useState(null);

    async function addWish() {
        try {
            const docRef = await addDoc(collection(firestore, 'tb_wish'), {           
                nomeWish: nomeWish,
                valorWish: valorWish,
                dataWish: dataWish,
                validWish: validWish
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Desejos cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Cadastre um novo desejo</Text>
            </View>
            <TextInput autoCapitalize="words" style={estilo.input} placeholder="Digite seu desejo" onChangeText={setnomeWish} vaule={nomeWish} />
            <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setvalorWish} value={valorWish} />
            <TextInput style={estilo.input} placeholder="Digite a data da sua conquista" onChangeText={setdataWish} value={dataWish} />
            <TextInput style={estilo.input} placeholder="Digite se você já conquistou ou não seu desejo" onChangeText={setvalidWish} value={validWish} />


            <TouchableOpacity style={estilo.btnenviar} onPress={() => {
                addWish();
            }}>
                <Text style={estilo.btntxtenviar}> Enviar </Text>
            </TouchableOpacity>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        padding: 20, 
        alignItems: 'center',
    },
    titulo: {
        marginVertical: 40,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8434EB',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#E0C8FF', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 20, 
        borderWidth: 1,
        borderColor: '#8434EB',
    },
    btnenviar: {
        backgroundColor: '#8434EB', 
        borderRadius: 50,
        padding: 15,
        marginTop: 20,
        width: '100%', 
        alignItems: 'center',
    },
    btntxtenviar: {
        fontSize: 20,
        color: '#FFFFFF', 
        fontWeight: 'bold',
    },
})
