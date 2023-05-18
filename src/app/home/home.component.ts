import { Component, OnInit } from '@angular/core';
import { AccountService, User } from '../services/account.service';
import { CartItem, CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartItems: CartItem[] = [];
  currentUser: User | null;

  constructor(private accountService: AccountService,private cartService: CartService) { 
    this.currentUser = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.fetchCartItems();
    console.log(this.currentUser,"user")
  }

  logout() {
    this.accountService.logout();
  }

  fetchCartItems() {
    const userName = this.accountService.userValue?.username;
    if (userName) {
      this.cartService.getCartItems(userName).subscribe(items => {
        this.cartItems = items;
      });
    }
  }
}
