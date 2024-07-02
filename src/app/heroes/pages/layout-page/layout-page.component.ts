import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserInterface } from '../../../auth/interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  private service = inject(AuthService);
  private router = inject(Router);

  public sidebarItems = [
    { name: 'Listado', icon: 'list', route: './list' },
    { name: 'Añadir', icon: 'add', route: './new-hero' },
    { name: 'Buscar', icon: 'search', route: './search' },
  ]

  get user():UserInterface | undefined {
    return this.service.currentUser;
  }
  onLogout() {
    this.service.logout();
    this.router.navigate(['/auth']);
  }

}
