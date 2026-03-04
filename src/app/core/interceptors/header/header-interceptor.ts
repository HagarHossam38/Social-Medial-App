import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platformId = inject(PLATFORM_ID)
  if (!req.url.includes('/signin') && !req.url.includes('/signup')) {
    if (isPlatformBrowser(platformId)) {
      if (localStorage.getItem('socialMediaToken')) {
        req = req.clone({
          setHeaders: {
            authorization: `Bearer ${localStorage.getItem('socialMediaToken')}`
          }
        });
      }
    }
  }
  return next(req);
};
