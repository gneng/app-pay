import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {
  // set the index offset to 0
  index = 0;
  // pokemon list
  pokemons = [];

  // transfer pokemon service stuff into constructor
  constructor(private pokemonService: PokemonService) { }

  // initialize by calling loadPokemons()
  ngOnInit() {
    this.loadPokemons();
  }

  // create a function to retrieve the results from pokemon service's getPokemons()
  loadPokemons(loadMorePokemons = false, event?) {

    // if need to load more than 30 pokemons, add 30 more
    if (loadMorePokemons) {
      this.index += 30;
    }

    this.pokemonService.getPokemons(this.index).subscribe(result => {
      // debug
      console.log('result: ', result);

      // concat pokemons list with the results
      this.pokemons = [...this.pokemons, ...result];

      // infinite scrolling
      if (event) {
        event.target.complete();
      }
    });
  }

  // searchbar function
  onSearchChange(event) {
    // get the value of event
    let value = event.detail.value;

    // if no input, returns all the pokemons
    if (value == '') {
      this.index = 0;
      this.loadPokemons();
      return;
    }

    // otherwise using findPokemon() function to retrieve the result
    this.pokemonService.findPokemon(value).subscribe(result => {
      this.pokemons = [result];
    }, err => {
      this.pokemons = [];
    });
  }

}
