<template>
  <div id="pokemon-info-panel">
    <div v-show="pokemonId && pokemonId > 0">
      <basic-information :pokemon="pokemon" />
      <stats-information :pokemon="pokemon" />
      <special-abilities :pokemon="pokemon" />
      <evolution-information :pokemon="pokemon" />
    </div>

    <b-container class="bv-example-row mb-3">
      <b-row cols="4">
        <b-col
          ><button class="btn btn-primary" @click="goPrevious">Previous</button>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <button class="btn btn-primary" @click="goNext">Next</button></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BasicInformation from "../PokemonDetails/BasicInformation.vue";
import StatsInformation from "../PokemonDetails/StatsInformation.vue";
import SpecialAbilities from "../PokemonDetails/SpecialAbilitiesInformation.vue";
import EvolutionInformation from "../PokemonDetails/EvolutionInformation.vue";

export default {
  name: "PokemonDetails",
  data() {
    return {
      pokemonId: this.$route.params.Pid,
      evoChain: [],
      pokemon: {
        id: "",
        weight: "",
        height: "",
        name: "",
        types: [],
        imageUrl: "",
        gender: "",
        color: "",
        hp: "",
        speed: "",
        attack: "",
        defence: "",
        special_attacks: [],
        description: "",
        evolution: [],
        test: [],
      },
    };
  },
  components: {
    BasicInformation,
    StatsInformation,
    SpecialAbilities,
    EvolutionInformation,
  },
  methods: {
    getPokemonDetails() {
      var evoChain = [];
      const url = "https://pokeapi.co/api/v2/pokemon/" + this.pokemonId;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.pokemon.id = this.pokemonId;
          this.pokemon.weight = data.weight;
          this.pokemon.height = data.height;
          this.pokemon.name = data.name;
          this.pokemon.types = data.types;
          this.pokemon.imageUrl =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            this.pokemonId +
            ".png";
          this.pokemon.hp = data.stats[0].base_stat;
          this.pokemon.speed = data.stats[5].base_stat;
          this.pokemon.attack = data.stats[1].base_stat;
          this.pokemon.defence = data.stats[2].base_stat;
          this.pokemon.special_attacks = data.abilities;

          let urlGenderMale = "https://pokeapi.co/api/v2/gender/2";
          fetch(urlGenderMale, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((responseGender) => responseGender.json())
            .then((dataGender) => {
              var data = dataGender.pokemon_species_details;
              for (var i = 0; i < data.length; i++) {
                if (data[i].pokemon_species.name === this.pokemon.name) {
                  this.pokemon.gender = "gendered";
                }
              }
            });

          //Genderless
          let urlGenderless = "https://pokeapi.co/api/v2/gender/3";
          fetch(urlGenderless, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((responseGender) => responseGender.json())
            .then((dataGender) => {
              var data = dataGender.pokemon_species_details;
              for (var i = 0; i < data.length; i++) {
                if (data[i].pokemon_species.name === this.pokemon.name) {
                  //console.log(data[i].pokemon_species.name + " is genderless");
                  this.pokemon.gender = "genderless";
                }
              }
            });

          let urlColor =
            "https://pokeapi.co/api/v2/pokemon-species/" + this.pokemonId;
          fetch(urlColor, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((responseColor) => responseColor.json())
            .then((dataColor) => {
              console.log(dataColor);
              this.pokemon.color = dataColor.color.name;
              this.pokemon.description =
                dataColor.flavor_text_entries[1].flavor_text;

              const evoChainUrl = dataColor.evolution_chain.url;
              //console.log("evoChainUrl = " + evoChainUrl);

              fetch(evoChainUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  var evoData = data.chain;
                  do {
                    let numberOfEvolutions = evoData["evolves_to"].length;

                    evoChain.push({
                      species_name: evoData.species.name,
                    });

                    if (numberOfEvolutions > 1) {
                      for (let i = 1; i < numberOfEvolutions; i++) {
                        evoChain.push({
                          species_name: evoData.evolves_to[i].species.name,
                        });
                      }
                    }

                    evoData = evoData["evolves_to"][0];

                    ////console.log(evoChain);
                  } while (
                    !!evoData &&
                    Object.prototype.hasOwnProperty.call(evoData, "evolves_to")
                  );
                  //console.log(evoChain);
                  this.pokemon.evolution = [];
                  for (let i = 0; i < evoChain.length; i++) {
                    var pokemonName = evoChain[i].species_name;
                    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
                      .then((response) => response.json())
                      .then((data) => {
                        this.pokemon.evolution.push({
                          id: data.id,
                          name: data.name,
                        });
                      });
                  }
                });
            });
        });
    },
    goNext() {
      let nextId = parseInt(this.pokemonId) + 1;
      this.pokemonId = nextId.toString();
      this.getPokemonDetails();
      //this.getEvoData();
      this.$router.push({
        path: `/pokemon/${this.pokemonId}`,
        params: { Pid: this.pokemonId },
      });
    },
    goPrevious() {
      let previousId = parseInt(this.pokemonId) - 1;

      if (previousId == 0) {
        return;
      }

      this.pokemonId = previousId.toString();
      this.getPokemonDetails();
      //this.getEvoData();
      this.$router.push({
        path: `/pokemon/${this.pokemonId}`,
        params: { Pid: this.pokemonId },
      });
    },
    // getAbilitiesDescription() {

    //   var attacks = this.pokemon.special_attacks;
    //   var test = {};
    //   console.log(attacks);
    //   for (var i = 0; i < attacks.length; i++) {
    //     let url = attacks[i].ability.url;
    //     fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((resData) => {
    //         console.log(resData);
    //         var filteredData = resData.flavor_text_entries.filter(function (
    //           element
    //         ) {
    //           return element.language.name === "en";
    //         });
    //         Object.assign(test, {
    //           description: filteredData[0].flavor_text,
    //         });
    //       });
    //   }
    //   console.log(this.pokemon.special_attacks);
    // },
  },
  created() {},
  mounted() {
    this.getPokemonDetails();
    //this.getAbilitiesDescription();
    //this.getEvoData();
  },
};
</script>

<style lang="scss" scoped>
@import "src/shared/_colours.scss";
@import "src/shared/_spacing.scss";

#pokemon-info-panel {
  height: 100vh;
  width: 100%;
  margin-bottom: $sm;
  border-right: $xxs solid $extralightgrey;
  padding: $xxl;
  background-color: $white;

  h3 {
    margin-top: -$sm;
    margin-left: -$sm;
    font-size: 36px;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .pokemon-info-panel-pokeball {
    float: right;
  }
}

#button-next {
  position: absolute;
  margin-left: -50px;
  left: 100%;
  width: 100px;
  bottom: 10px;
}

#button-previous {
  position: absolute;
  left: 0%;
  width: 100px;
  bottom: 10px;
}

@media only screen and (max-width: 1024px) {
  #description-container {
    padding-top: $sm;
    padding-bottom: $md;
    margin: $sm 0;
  }

  #pokemon-sprite {
    display: block;
    float: left;
    padding: $sm;
  }
}
</style>
