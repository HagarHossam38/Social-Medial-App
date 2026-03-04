import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // msh m7tagen n3ml ay 7aga ll request hna
  let toastrService = inject(ToastrService);
  return next(req).pipe(catchError(err => {// catch error has parameter that hold our error
    //Logic to handle error
    toastrService.error(err.error.message, 'Error Happened :(');
    // console.log('Inereceptor error', err);
    return throwError(() => err); // must return observable
  })); //hna hnt3aml m3 el response
};
