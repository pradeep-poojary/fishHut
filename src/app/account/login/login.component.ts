import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,  private accountService: AccountService,private router: Router,) { 
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  get formControls() {
    return this.loginForm.controls;
  }

   onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.formControls['username']?.value, this.formControls['password']?.value)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
