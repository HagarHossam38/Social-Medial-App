import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  //Services 
  //  API Service
  private readonly authService = inject(AuthService);
  //  navigation Service
  private readonly router = inject(Router);

  //==========================
  // Global variables
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  //Global Variables
  apiErrorMessage: string = ''; //=> empty string y3ny false
  apiSuccessMessage: string = '';
  //==========================

  //Register Form
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    username: new FormControl(null, [Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl('', [Validators.required,]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: this.checkConfirmPassword });

  timerId: any;
  apiSubscription!: Subscription;
  signUp(): void {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.isLoading = true;//Loading Flag
      this.apiSubscription = this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response);
            //N-fady el error 3shan yb2a empty string===>false
            this.apiErrorMessage = ''
            //handle Success msg
            this.apiSuccessMessage = response.message;

            this.isLoading = false; //Loading Flag

          }

        },
        error: (err) => {
          console.log(err);
          //N-fady el success 3shan yb2a empty string===>false
          this.apiSuccessMessage = ''
          //handle Error msg
          this.apiErrorMessage = err.error.message;

          this.isLoading = false;//Loading Flag
        },
        complete: () => {
          this.timerId = setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500)
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  checkConfirmPassword(group: any) {
    return group.get('password')?.value === group.get('rePassword')?.value ? null : { mismatch: true }
  }
}
