import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";


export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    return checkAuthStatus();
}

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
}

const checkAuthStatus = (): Observable<boolean> => {

    const service = inject(AuthService);
    const router = inject(Router);

    return service.checkAuthentication().pipe(
        tap(authenticated => {
            if (!authenticated) {
                router.navigateByUrl('/auth/login');
            }
        })
    );
}

