import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './State/User/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from './Models/AppState';
import { select, Store } from '@ngrx/store';
//import { ProductsComponent } from './Module/feature/components/products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grocery_Store_Frontend_SCSS';

  userProfile:any

  constructor(private router: Router, private dialog:MatDialog,
    private userService:UserService, private store:Store<AppState>
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem("jwt")) this.userService.getUserProfile()

    this.store.pipe(select((store)=>store.auth)).subscribe((user)=>{
      this.userService.getUserProfile()
    })
  }
}
