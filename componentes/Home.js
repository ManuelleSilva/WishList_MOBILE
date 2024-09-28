import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc, QuerySnapshot } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {

    const [wish, setWish] = useState([]);

    async function deleteWish(id) {
        try {
            await deleteDoc(doc(firestore, "tb_wish", id));
            Alert.alert("O seu desejo foi deletado.")
        } catch (erro) {
            console.erro("Erro ao deletar.", error)
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'tb_wish'), (QuerySnapshot) => {
            const lista =[];
            QuerySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            })
            setWish(lista);
        })
        return () => unsubcribe();
    }, []);

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.TituloAPP}>WishList</Text>
            </View>
            <FlatList
                data={wish}
                renderItem={({ item }) => {
                    return (
                        <View style={estilo.Card}>
                            <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                id: item.id,
                                nomeWish: item.nomeWish,
                                valorWish: item.valorWish,
                                dataWish: item.dataWish,
                                validWish: item.validWish
                            })}>
                                <View>
                                    <Text style={estilo.textWIshTitulo}><Text>{item.nomeWish}</Text></Text>
                                    <Text style={estilo.textWish}>Valor: R$ <Text>{item.valorWish}</Text></Text>
                                    <Text style={estilo.textWish}>Data da conquista: <Text>{item.dataWish}</Text></Text>
                                    <Text style={estilo.textWish}>Conquistado: <Text>{item.validWish}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => {deleteWish(item.id) }}>
                                <Icon name="trash" size={20} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")}>
            <Text>ADICIONAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 20,
    },
    TituloAPP: {
        marginTop: 50,
        fontSize: 30,
        color: '#8434EB',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    Card: {
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#E0C8FF',
        borderRadius: 20,
        width: '95%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap:15,
    },
    cardContent: {
        flex: 1,
        paddingRight: 40,
    },
    textWIshTitulo: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5,
    },
    textWish: {
        fontSize: 14,
        color: '#000',
        marginBottom: 3,
    },
    botaodeletar: {
        backgroundColor: '#8434EB',
        borderRadius: 25,
        padding: 8,
        position: 'absolute',
        right: 10,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconTrash: {
        marginLeft: 10,
    },
    botaoAdicionar: {
        backgroundColor: '#8434EB',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 40,
        right: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    textAdicionar: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});