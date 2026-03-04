import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('socialMediaToken') != null) {
      return router.parseUrl('/home');
    }
    else {
      return true;
    }
  }
  else { return true; }

};
