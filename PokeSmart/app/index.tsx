import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [pokemonName, setPokemonName] = useState("");

  const goToPokemon = () => {
    const name = pokemonName.trim().toLowerCase();
    if (!name) return;

    router.push(`/pokemon/${name}` as const);
    setPokemonName("");
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>Pokédex</Text>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name (e.g. pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={goToPokemon}
      />

      {/* SEARCH BUTTON */}
      <Pressable style={styles.button} onPress={goToPokemon}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      {/* OVERVIEW / SUMMARY */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>What you’ll see</Text>

        <Text style={styles.summaryItem}>
          • Best Moveset – recommended fast and charge moves based on damage,
          tempo, and stat effects
        </Text>

        <Text style={styles.summaryItem}>
          • Best Counters – Pokémon types that are most effective against it
        </Text>

        <Text style={styles.summaryItem}>
          • Evolution Path – full evolution chain from base to final form
        </Text>

        <Text style={styles.summaryItem}>
          • Overall Summary – strengths, weaknesses, and playstyle at a glance
        </Text>
      </View>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryBox: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryItem: {
    fontSize: 14,
    marginBottom: 6,
  },
});
