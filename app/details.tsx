import { Stack, useLocalSearchParams } from "expo-router";
import { use, useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

interface PokemonData{
    name: string;
    weight: number;
    sprites: {
        front_default: string;
    };
    abilities: {
        ability: {
        name: string;
        };
    }[];
}

export default function Details() {
    const params = useLocalSearchParams();

    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    
    useEffect(()=>{
        fetchPokemonDetail(params.name as string);
    }, [params.name])

    async function fetchPokemonDetail(name: string){
        try{

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            )
            const data = await response.json();
            setPokemon(data);

        } catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: params.name as string }} />
            <ScrollView
            contentContainerStyle={{
                gap: 16,
                padding: 16,
            }}
            >
                <Text style={styles.name}>{params.name}</Text>
                {pokemon && (
                <Text>Peso: { pokemon.weight/10 } kg</Text>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
  name: {
    textTransform: 'capitalize',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  }
})