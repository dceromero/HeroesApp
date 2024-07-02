import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, tap } from "rxjs";

export const publicCanActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    return checkAuthStatus();
}

export const publicCanMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
}

function checkAuthStatus() {

    const service = inject(AuthService);
    const router = inject(Router);

    return service.checkAuthentication().pipe(
        tap(authenticated => {
            if (authenticated) {
                router.navigateByUrl('/');
            }
        }),
        map(authenticated => !authenticated)
    );
}