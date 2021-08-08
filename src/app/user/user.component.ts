import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from "../user";
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.retrieveData();
    }
    //this.retrieveData();
  }

  retrieveData(): void {
    console.log('vao day roi');
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('data luc dau: ' + data);
        this.users = data;
        console.log('thanh cong:' + data);
      },
      (error) => {
        console.log('That bai: ' + error);
      }
    );
  }

  onSubmit(): void {
    this.authService.login().subscribe(
      (data) => {
        console.log(data);
        console.log(data.headers);
        console.log(data.headers.get('Authorization'));
        //this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveToken(data.headers.get('Authorization'));
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
