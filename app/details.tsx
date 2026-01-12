import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Image, View } from "react-native";

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
                    <>
                        <View style={styles.pokemon}>
                            <Image source={{uri: pokemon.sprites.front_default}}
                                style={{ width: 150, height: 150 }} />
                        </View>
                        <View>
                            <Text style={styles.subtitles}>Abilities:</Text>
                            {pokemon.abilities.map((item, index) => (
                                <Text key={index} style={styles.infos}>
                                    { item.ability.name }
                                </Text>
                            ))}
                        </View>

                        <Text>Peso: {pokemon.weight / 10} kg</Text>
                    </>
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
    color: '#22356d',
  },
  subtitles:{
    textTransform: 'capitalize',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#22356d',
  },
  infos:{
    textTransform: 'capitalize',
    fontSize: 15,
    textAlign: 'left',
  },
  pokemon: {
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  }
})