import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  // url for basic pokemons' info
  url = 'https://pokeapi.co/api/v2/';
  // url for pokemon's sprites
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // passing in HttpClient into constructor
  constructor(private http: HttpClient) {
  }

  // create a function to get at most 30 pokemons from 'url'
  getPokemons(index = 0) {
    return this.http.get(`${this.url}pokemon?offset=${index}&limit=30`)
    .pipe(
      // only return 'results' array
      map(result => {return result['results']}),

      // for every pokemon...
      map(pokemons => { 
        
        return pokemons.map((pokemon, spriteId) => {
          // set up the math for pokemon's sprite index 
          pokemon.pokeIndex = spriteId + index + 1;

          // pass in the correct index to that pokemon
          pokemon.image = this.getPokemonsSprite(pokemon.pokeIndex);

          // return the pokemon
          return pokemon;
        })
      })
    );
  };

  // this function is to getting pokemon's sprite
  getPokemonsSprite(spriteId) {
    // return the image's url
    return `${this.imageUrl}${spriteId}.png`
  }

  // this function is responsible for search bar finding
  findPokemon(searchItem) {
    // return the url of user's input
    return this.http.get(`${this.url}pokemon/${searchItem}`)
    .pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokemonsSprite(pokemon['id']); // display image
        pokemon['pokeIndex'] = pokemon['id']; // stores the id into pokeIndex
        return pokemon;
      })
    )
  }

  // this function is to return the pokemon's details
  getPokeDetails(index) {
    // returns the url of clicked/chosen pokemon
    return this.http.get(`${this.url}pokemon/${index}`)
    .pipe(
      map (pokemon => {
        // stores the sprites with current pokemon's sprites available
        let sprites = Object.keys(pokemon['sprites']);

        // pass in the pokemon's images with sprites
        pokemon['images'] = sprites
          .map(spriteKey => pokemon['sprites'][spriteKey]) // feed with different number of sprites
          .filter (img => img); // filter out null images
        return pokemon;
      })
    );
  };
}
