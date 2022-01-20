
import PokemonDetail from './components/Pokemons/PokemonDetail.vue';
import Home from './pages/Home.vue'
import Favourite from './pages/Favorite.vue'

export const routes = [
    { path: '/', redirect: '/pokemon' },
    { path: '/pokemon', component: Home },
    { path: '/pokemon/:Pid', component: PokemonDetail },
    { path: '/favourite', component: Favourite },
    { path: '/:notFound(.*)', redirect: '/pokemon' },

];
