import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errormsg: string='';
  showerror: boolean=false;


  ngOnInit(): void {
  }
  loginForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
          if(response.token != null){
            window.sessionStorage.setItem('token',response.token)
            this.router.navigate(['/dashboard'])
          }
        },
        error => {
          console.error('Login failed', error);
          this.showerror = true;
          this.errormsg= error;
        }
      );
    }
  }
}
