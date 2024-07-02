import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lagin-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  
  private service = inject(AuthService);
  private router = inject(Router);
  public hide = true;

  onLogin(){
    this.service.login('kH9u9@example.com', '123456').subscribe(
      user =>{
        this.router.navigateByUrl('/heroes');
      }
    )
  }
}
