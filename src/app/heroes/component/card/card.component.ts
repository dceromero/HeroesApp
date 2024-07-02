import { Component, Input } from '@angular/core';
import { Heroes } from '../../interfaces/heroes';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
onDeleteHero() {
throw new Error('Method not implemented.');
}
  @Input() hero!: Heroes;

}
