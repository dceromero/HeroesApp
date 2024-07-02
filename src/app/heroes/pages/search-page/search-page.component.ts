import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroes } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';
import { delay } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  private service = inject(HeroesService);
  public searchInpt = new FormControl('');
  public heroes: Heroes[] = [];
  public selectedHero: Heroes | undefined;

  searchHero() {
    const valor: string = this.searchInpt.value ?? '';
    this.service.getSuggestions(valor)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
    } else {
      const hero: Heroes = event.option.value;
      this.searchInpt.setValue(hero.superhero);
      this.selectedHero = hero;
    }
  }
}
