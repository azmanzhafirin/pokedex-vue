<template>
  <div class="container" style="margin-top: 30px">
    <pokemon-list
      :pokemonList="filteredData"
      :favorites="stateFavoritePokemonList"
      v-bind:value="searchString"
      v-on:input="searchString = $event"
      @getPokemon="getPokemonData"
      @loadMoreClick="loadMorePokemon"
      @deleteFavorite="deleteFavorite"
      @addFavorite="addFavorite"
      :fromFavorite="fromFavorite"
    ></pokemon-list>
  </div>
</template>

<script>
import PokemonList from "../components/Pokemons/PokemonList.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { PokemonList },
  data() {
    return {
      pokeData: {},
      pokemons: [],
      counter: 0,
      searchString: "",
      selected: [],
      favorites: [],
      fromFavorite: false,
    };
  },
  methods: {
    getPokemonData() {
      let url =
        "https://pokeapi.co/api/v2/pokemon/?offset=" +
        this.counter +
        "&limit=20";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.results.length; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${data.results[i].name}/`)
              .then((response) => response.json())
              .then((pData) => {
                this.pokeData = { ...data.results[i], ...pData };
                this.pokemons.push(this.pokeData);
              });
          }
        });
    },
    loadMorePokemon() {
      this.counter += 20;
      this.getPokemonData();
    },

    goToPokemonDetail(data) {
      this.$router.push({
        path: `/pokemon/${data.id}`,
        params: { Pid: data.id },
      });
    },

    checkLocalStorage() {
      console.log("checking local storage....");
      //Check local storage for any pokemons
      const data = localStorage.getItem("favPokemon");

      if (data && data.length > 0) {
        const parsedData = JSON.parse(data);
        this.setFavoritePokemonList(parsedData);
        this.selected = this.stateFavoritePokemonList;
      }
    },
    ...mapActions(["setFavoritePokemonList", "deleteFavorite", "addFavorite"]),
  },
  computed: {
    filteredData: function () {
      var search_array = this.pokemons,
        searchString = this.searchString;
      if (!searchString) {
        return search_array;
      }
      searchString = searchString.trim().toLowerCase();
      search_array = search_array.filter((item) => {
        if (
          item.name.toLowerCase().indexOf(searchString) !== -1 ||
          item.id.toString() === searchString
        ) {
          return item;
        }
      });
      return search_array;
    },
    ...mapState(["statePokemonDataList", "stateFavoritePokemonList"]),
  },
  mounted() {
    this.checkLocalStorage();
    this.getPokemonData();
  },
};
</script>