import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { IUser } from '../../models/User/iuser.interface';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //Services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder)
  //===============================
  //Old Syntax
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  // });
  //New Syntaz with form builder
  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.minLength(3)]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });
  //===============================
  //Flags
  isLoading: boolean = false;
  isSubmitted: boolean = false;;
  //API Messages
  apiErrorMessage: string = ''
  apiSuccessMessage: string = ''
  //Id's
  apiSubscription!: Subscription;
  timerId: any;
  //===============================

  loggedInUser!: IUser;
  signIn() {
    this.isSubmitted = true;
    console.log('ooooooooo');
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log(this.loginForm);
      this.apiSubscription = this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response);
            this.isLoading = false;
            this.apiErrorMessage = '';
            this.apiSuccessMessage = response.message;


            //Save Token
            localStorage.setItem('socialMediaToken', response.data.token);
            //Save User Info
            this.loggedInUser = response.data.user;
            console.log("user:::", this.loggedInUser);
            localStorage.setItem('loggedUserData', JSON.stringify(this.loggedInUser))
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiSuccessMessage = '';
          this.apiErrorMessage = err.error.message;
          console.log('API Error:', this.apiErrorMessage);

        },
        complete: () => {
          this.isLoading = false;
          this.timerId = setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        }
      })

    }
    console.log(
      'error', this.loginForm.get('email')?.errors);

    console.log(
      'submitted:', this.isSubmitted);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearTimeout(this.timerId);
    // this.apiSubscription.unsubscribe();
  }
}
