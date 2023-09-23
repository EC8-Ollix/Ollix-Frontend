<template>
    <a-table :dataSource="pokemons" :columns="columns" />
</template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Pokemon {
    id: number;
    name: string;
    types: string;
    abilities: string;
  }
  
  interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }
  
  export default defineComponent({
    name: 'Pokemon Table',
    props: {
      message: {
        type: String as PropType<string>,
        required: true,
      },
    },
    setup(props) {

      const pokemons = ref<Pokemon[]>([]);
  
      const fetchPokemons = async () => {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
          const data: PokemonApiResponse = response.data;
          const pokemonsData: Pokemon[] = await Promise.all(
            data.results.map(async (pokemonData) => {
              const pokemonResponse = await axios.get(pokemonData.url);
              const pokemonDetails = pokemonResponse.data;
              return {
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                types: pokemonDetails.types.map((type: any) => type.type.name).join(', '),
                abilities: pokemonDetails.abilities.map((ability: any) => ability.ability.name).join(', '),
              };
            })
          );
  
          pokemons.value = pokemonsData;
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      };
  
      onMounted(fetchPokemons);
  
      return {
        pokemons,
        columns: [
          {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Types',
            dataIndex: 'types',
            key: 'types',
          },
          {
            title: 'Abilities',
            dataIndex: 'abilities',
            key: 'abilities',
          },
        ],
      };
    },
  });
  </script>
  
  <style scoped>

  </style>
  