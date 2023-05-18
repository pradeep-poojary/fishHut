import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../cart.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: any [];

  constructor(private cartService: CartService, private accountService: AccountService) { 
   
  }

  ngOnInit(): void {
    const userId = this.accountService.userValue?.id;
    this.cartService.getCartItems(userId).subscribe(items => {
      console.log(items,"items");
      this.cartItems = items;
      console.log(this.cartItems,"this.cartItems");
    });
  }

  removeFromCart(item: number) {
    window.alert(item)
    this.cartService.removeCartItem(item).subscribe(() => {
      // Update the cartItems list after removing the item
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item);
    });
  }
}