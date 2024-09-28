import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function Alterar({ navigation, route }) {

    const id = route.params.id;
    const [nomeWish, setnomeWish] = useState(route.params.nomeWish);
    const [valorWish, setvalorWish] = useState(route.params.valorWish);
    const [dataWish, setdataWish] = useState(route.params.dataWish);
    const [validWish, setvalidWish] = useState(route.params.validWish);


    async function alterar(id, nomeWish, siglaCripto, valorCripto) {
        try {
            await updateDoc(doc(collection(firestore, "tb_wish"), id), {
                nomeWish: item.nomeWish,
                valorWish: item.valorWish,
                dataWish: item.dataWish,
                validWish: item.validWish
            })
            Alert.alert("Aviso", "Desejo Alterado com sucesso.")
            navigation.navigate("Home")
        } catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por Favor, tente novamente.");
        }
    }
    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Alterar seu desejo</Text>
            </View>
            <View>
                <TextInput autoCapitalize="words" style={estilo.input} placeholder="Digite o seu desejo" onChangeText={setnomeWish} vaule={nomeWish} />
                <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setvalorWish} vaule={valorWish} />
                <TextInput style={estilo.input} placeholder="Digite a data da sua conquista" onChangeText={setdataWish} vaule={dataWish} />
                <TextInput style={estilo.input} placeholder="Digite a se você já conquistou ou não seu desejo" onChangeText={setvalidWish} vaule={validWish} />
                <TouchableOpacity style={estilo.btnenviar} onPress={() => {
                    alterar(id, nomeWish, valorWish, dataWish, validWish);
                }}>
                    <Text style={estilo.btntxtenviar}>Alterar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        padding: 20, 
        alignItems: 'stretch',
    },
    titulo: {
        marginVertical: 40,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8434EB',
        textAlign: 'center',
    },
    input: {
        width: '100%', // Mantido 100%
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
        width: '100%', // Mantido 100%
        alignItems: 'center',
    },
    btntxtenviar: {
        fontSize: 20,
        color: '#FFFFFF', 
        fontWeight: 'bold',
    },
});
