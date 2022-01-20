<template>
  <div class="container" style="margin-top: 30px">
    <pokemon-list
      :pokemonList="filteredData"
      :favorites="stateFavoritePokemonList"
      :fromFavorite="fromFavorite"
      @deleteFavorite="deleteFavorite"
      @addFavorite="addFavorite"
      v-model="searchString"
    />
  </div>
</template>


<script>
import PokemonList from "../components/Pokemons/PokemonList.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "FavoritePage",
  components: { PokemonList },
  data() {
    return {
      pokeData: {},
      pokemons: [],
      counter: 0,
      searchString: "",
      selected: [],
      favorites: [],
      favoriteList: [],
      fromFavorite: true,
    };
  },
  computed: {
    filteredData: function () {
      var search_array = this.favorites,
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

  methods: {
    getPokemonData() {
      var favoriteList = this.stateFavoritePokemonList;
      for (var i = 0; i < favoriteList.length; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${favoriteList[i]}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((pData) => {
            this.favorites.push(pData);
          });
      }
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

    ...mapActions([
      "setPokemonData",
      "addFavorite",
      "deleteFavorite",
      "eraseFavoritePokemonList",
      "setFavoritePokemonList",
    ]),
  },
  mounted() {
    this.checkLocalStorage();
    this.getPokemonData();
  },
};
</script>

<style lang="scss" scoped>
@import "src/shared/_colours.scss";
@import "src/shared/_spacing.scss";

.panel {
  padding: $xl $xl 0 $xl;
}

/* Search table */
#table-overflow {
  overflow: hidden;
}

#pokemon-image {
  height: 50px;
  width: 50px;
}

#table-container {
  height: 80vh;
  width: 100%;
  border: none;
  overflow: auto;
  background: $white;
}

#table-container::-webkit-scrollbar {
  display: none;
}

.pokedex-table {
  padding: $lg;
  background: $white;
  cursor: pointer;
}

/* Search bar */
#search-bar {
  width: 100%;
  margin: 0 0 $lg 0;
  border: none;
  border-bottom: 3px solid lighten($grey, 28%);
  border-radius: 0;
  padding: $lg;
  background: lighten($grey, 28%);
  transition: border 0.2s linear;
}

#search-bar,
#search-bar:focus,
#search-bar::placeholder {
  color: $grey;
}

#search-bar:focus {
  border-bottom: 3px solid lighten($grey, 15%);
}

.form-control {
  box-shadow: none;
}

#button-load-more {
  position: absolute;
  margin-left: -50px;
  left: 50%;
  width: 100px;
  bottom: 10px;
}
</style>
