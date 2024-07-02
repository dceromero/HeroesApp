
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Heroes, Publisher } from '../../interfaces/heroes';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  private activateRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private service = inject(HeroesService);
  private snackbar = inject(MatSnackBar);

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    publisher: new FormControl<Publisher>(Publisher.DCComics, [Validators.required]),
    alter_ego: new FormControl('', [Validators.required]),
    first_appearance: new FormControl('', [Validators.required]),
    characters: new FormControl('', [Validators.required]),
    alt_img: new FormControl('')
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  get currentHero(): Heroes {
    const hero = this.heroForm.value as Heroes;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigate(['/heroes/list']);
        } else {
          this.heroForm.reset(hero);
        }
      });
  }
  public onSubmit() {
    if (this.heroForm.valid) {
      if (this.currentHero.id) {
        this.service.updateHero(this.currentHero).subscribe(
          hero => {
            this.showSnackBar(`${hero.superhero} Actualizado`);
          }
        );
        return;
      } else {
        this.currentHero.id = new Date().getTime().toString();
        this.service.addHero(this.currentHero).subscribe(
          hero => {
            this.showSnackBar(`${hero.superhero} Guardado`);
            this.router.navigate(['/heroes/edit', hero.id])
          }
        );
        return;
      }
    }
  }

  public onDeleteHero() {
    if (!this.currentHero.id) throw console.error('Heroe id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });
    dialogRef.afterClosed().
      pipe(
        filter((result: boolean) => result),
        switchMap(() => this.service.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      ).subscribe(() => {
        this.showSnackBar(`${this.currentHero.superhero} Eliminado`);
        this.router.navigate(['/heroes/list']);
      });

  }
  private showSnackBar(message: string) {
    this.snackbar.open(message, 'Ok', {
      duration: 2500
    })
  }


}
