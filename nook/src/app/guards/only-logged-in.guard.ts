import { inject } from '@angular/core';
import {  Router } from '@angular/router';
import { authService } from '../services/auth/auth.service';
import { take, tap } from 'rxjs';

export const onlyLoggedInGuard = () => {
    const auth = inject(authService);
    const router = inject(Router);
    return auth.user$.pipe(
      take(1),
      tap((isLoggedIn) =>
        !!isLoggedIn ? true :   router.navigate(['/login'])
      )
    );
};