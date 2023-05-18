import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

export interface User {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission
      const name = this.signupForm.get('firstName')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;

      console.log(name,email,password , "submit")

      const user: User = {
        firstName: name,
        username: email,
        password: password
        
      };

      this.accountService.register(user).subscribe(
        () => {
          console.log(user,'User registered successfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    
    }
  }

}
