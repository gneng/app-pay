import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemons/pokemon.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  // declare details which accepts all types
  details: any;

  // image slides
  slideOpts = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };

  constructor(private route: ActivatedRoute, private pokeService: PokemonService, private socialSharing: SocialSharing) { }

  ngOnInit() {
    // get the index of this route
    let index = this.route.snapshot.paramMap.get('pokemonId');

    // using getPokeDetails() func from pokeService, feed the details with results retrieved
    this.pokeService.getPokeDetails(index).subscribe(results => {
      console.log('Details: ', results);
      this.details = results;
    });
  };

  // sharing pokemon name and move function
  sharing(move) {
    // constructing the message to be sent
    let pokemonName = this.details.name;
    
    let message: string = 
      'Check this out, ' 
      + pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) 
      + ' can actually do ' 
      + move.charAt(0).toUpperCase() + move.slice(1)
      + '!';

    this.socialSharing.share(message, this.details.name).then(() => {
      // Succeed
      console.log('Message: ', move, 'by', this.details.name);
    }).catch(err => {
      // Failed
      console.log('Failed to share message:', message);
    })
  };

}
