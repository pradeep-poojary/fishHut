
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  productId: number;
  userId: number;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cartItems';

  constructor(private http: HttpClient) { }

  getCartItems(userId: any): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addToCart(cartItem: any): Observable<CartItem> {
    console.log(cartItem,"cartItem")
    return this.http.post<any>(this.apiUrl, cartItem);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    const url = `${this.apiUrl}/${cartItem.id}`;
    return this.http.put<CartItem>(url, cartItem);
  }

  removeCartItem(item:any): Observable<any> {
    const url = `${this.apiUrl}/${item}`;
    window.alert(url)
    return this.http.delete<any>(url);
  }
}
