import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ---------- TYPES ---------- */

type Pokemon = {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  moves: {
    move: { name: string };
  }[];
  species: {
    url: string;
  };
};

type EvolutionNode = {
  species: { name: string };
  evolves_to: EvolutionNode[];
};

type MoveDetail = {
  name: string;
  power: number;
  damageClass: "physical" | "special" | "status";
  type: string;
};

type TypeResponse = {
  damage_relations: {
    double_damage_from: { name: string }[];
  };
};

/* ---------- HELPERS ---------- */

async function fetchMoveDetail(moveName: string): Promise<MoveDetail> {
  const res = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}`);
  const m = res.data;

  return {
    name: m.name,
    power: m.power ?? 0,
    damageClass: m.damage_class.name,
    type: m.type.name,
  };
}

function parseEvolutionChain(chain: EvolutionNode): string[] {
  const result: string[] = [];
  let current: EvolutionNode | undefined = chain;

  while (current) {
    result.push(current.species.name);
    current = current.evolves_to[0];
  }

  return result;
}

/* ---------- SCREEN ---------- */

export default function PokemonDetail() {
  const params = useLocalSearchParams<{ name?: string | string[] }>();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [allMoves, setAllMoves] = useState<string[]>([]);
  const [bestFastMove, setBestFastMove] = useState<string>("");
  const [bestChargedMoves, setBestChargedMoves] = useState<string[]>([]);
  const [counters, setCounters] = useState<string[]>([]);
  const [evolution, setEvolution] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        /* ---------- POKÉMON ---------- */
        const pokemonRes = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const pokemonData = pokemonRes.data;
        setPokemon(pokemonData);

        const pokemonTypes = pokemonData.types.map(t => t.type.name);

        /* ---------- ALL MOVES ---------- */
        const moveNames = pokemonData.moves.map(m => m.move.name);
        setAllMoves(moveNames);

        /* ---------- MOVE DETAILS (LIMITED) ---------- */
        const moveDetails = await Promise.all(
          moveNames.slice(0, 40).map(fetchMoveDetail)
        );

        /* ---------- BEST FAST MOVE ---------- */
        const fastMoves = moveDetails.filter(
          m => m.damageClass === "status" || m.power <= 40
        );

        const chosenFast =
          fastMoves.find(m => pokemonTypes.includes(m.type)) ??
          fastMoves[0];

        setBestFastMove(chosenFast?.name ?? "");

        /* ---------- BEST CHARGED MOVES ---------- */
        const chargedMoves = moveDetails
          .filter(m => m.power > 0 && m.damageClass !== "status")
          .map(m => ({
            ...m,
            score:
              m.power +
              (pokemonTypes.includes(m.type) ? 20 : 0),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 2);

        setBestChargedMoves(chargedMoves.map(m => m.name));

        /* ---------- EVOLUTION ---------- */
        const speciesRes = await axios.get(pokemonData.species.url);
        const evolutionRes = await axios.get(
          speciesRes.data.evolution_chain.url
        );
        setEvolution(parseEvolutionChain(evolutionRes.data.chain));

        /* ---------- COUNTERS ---------- */
        const typeResponses = await Promise.all(
          pokemonData.types.map(t =>
            axios.get<TypeResponse>(
              `https://pokeapi.co/api/v2/type/${t.type.name}`
            )
          )
        );

        const weaknesses = typeResponses.flatMap(res =>
          res.data.damage_relations.double_damage_from.map(
            d => d.name
          )
        );

        const uniqueWeaknesses = Array.from(new Set(weaknesses));
        setCounters(uniqueWeaknesses);

        /* ---------- SUMMARY ---------- */
        setSummary(
          `${pokemonData.name.toUpperCase()} is a ${pokemonTypes.join(
            " / "
          )}-type Pokémon. It performs best with ${
            chosenFast?.name ?? "a fast setup move"
          } and strong charged attacks like ${chargedMoves
            .map(m => m.name)
            .join(", ")}. ${
            uniqueWeaknesses.length > 0
              ? `It is vulnerable to ${uniqueWeaknesses
                  .slice(0, 3)
                  .join(", ")}-type Pokémon.`
              : `It has no major weaknesses.`
          }`
        );
      } catch {
        setError("Pokémon not found");
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading Pokémon…</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error ?? "Something went wrong"}
        </Text>
      </View>
    );
  }

  /* ---------- UI ---------- */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pokemon.sprites.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />
      )}

      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

      <Text style={styles.section}>Overview</Text>
      <Text>{summary}</Text>

      <Text style={styles.section}>Best Fast Move</Text>
      <Text>• {bestFastMove}</Text>

      <Text style={styles.section}>Best Charged Moves</Text>
      {bestChargedMoves.map(m => (
        <Text key={m}>• {m}</Text>
      ))}

      <Text style={styles.section}>Best Counters</Text>
      {counters.length === 0 ? (
        <Text>No major weaknesses</Text>
      ) : (
        counters.map(c => (
          <Text key={c}>• {c.toUpperCase()} type Pokémon</Text>
        ))
      )}

      <Text style={styles.section}>Evolution Path</Text>
      {evolution.map(e => (
        <Text key={e}>• {e.toUpperCase()}</Text>
      ))}

      <Text style={styles.section}>All Moves</Text>
      {allMoves.map(m => (
        <Text key={m}>• {m}</Text>
      ))}
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
