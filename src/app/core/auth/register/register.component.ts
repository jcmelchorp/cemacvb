import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private _service = inject(AuthService);
  private _fb = inject(FormBuilder);
   router = inject(Router);
   errorMessage!: string | null;

  registerForm = this._fb.group(
    {
      email: new FormControl(''),
      password: new FormControl(''),
    });
  
  byGoogle(): void {
    this._service
      .byGoogle()
      //.then(() => /* some logic here */ )
      //.catch(() => /* some logic here */ );
  }

  byForm(): void {
    const { email, password } = this.registerForm.value;
    this._service
      .signup(email!, password!)
      .then(() =>  this.router.navigateByUrl('/') )
      .catch((err) => this.errorMessage = err.code
    );
  }
}