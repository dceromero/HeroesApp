import { Component, OnInit, inject } from '@angular/core';
import { Heroes } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  
  private service = inject(HeroesService)
  public listHeroes:Heroes[] = [
    
  ]
  ngOnInit(): void {
    this.service.getHeroes().subscribe(heroes => this.listHeroes = heroes);
  }

}
