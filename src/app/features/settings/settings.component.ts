import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from '../../core/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  changePasswordSub!: Subscription;
  apiErrorMessage: string = '';
  apiSuccessMessage: string = '';
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  }, { validators: this.checkConfirmPassword });
  buttonMessage: string = 'Update Password'
  timerId: any;
  changePassword() {
    if (this.changePasswordForm.valid) {
      this.buttonMessage = 'Updating Password...'
      const { password, newPassword } = this.changePasswordForm.value;
      const apiData = { password, newPassword };
      this.changePasswordSub = this.userService.changeMyPassword(apiData).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.buttonMessage = 'Update Password'
            this.apiErrorMessage = '';
            this.apiSuccessMessage = res.message;

          }
        },
        error: (err) => {
          console.log(err.error.message);
          this.buttonMessage = 'Update Password'
          this.apiSuccessMessage = '';
          this.apiErrorMessage = err.error.message;
        },
        complete: () => {
          this.timerId = setTimeout(() => {
            this.userService.signOut();
          }, 1500)
        }
      })
    }
    console.log('apiErrorMessage', this.apiErrorMessage);
    console.log('apiSuccessMessage', this.apiSuccessMessage);

  }
  checkConfirmPassword(group: any) {
    return group.get('rePassword')?.value === group.get('newPassword')?.value ? null : { mismatch: true };
  }

}
