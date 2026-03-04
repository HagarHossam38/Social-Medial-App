import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { platform } from 'os';
//Parameters: 
//  Route=>   information about current route
//  State => Path
export const authGuard: CanActivateFn = (route, state) => {
  let platformId = inject(PLATFORM_ID);
  //Handle if false Navigate back to login
  let router = inject(Router)
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('socialMediaToken')) {
      return true;
    }
  }
  return router.parseUrl('/login');
};
