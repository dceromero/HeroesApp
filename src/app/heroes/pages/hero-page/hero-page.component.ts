import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/heroes';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  private service = inject(HeroesService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router)

  public hero?: Heroes;
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        delay(2000),
        switchMap(({ id }) => this.service.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigate(['/heroes/list']);
        } else {
          this.hero = hero;
        }
      })
  }

  goBack() {
    this.router.navigateByUrl('heroes/list');
  }
}
