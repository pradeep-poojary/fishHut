import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product, ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cartItems!: any[];

  constructor(private productService: ProductService,
    private cartService: CartService,
    private accountService: AccountService) {
     }

  ngOnInit(): void {
    this.getProducts();
    // const userName = this.accountService.userValue?.username;
    // if (userName) {
    //   this.cartService.getCartItems(userName).subscribe(items => {
    //     this.cartItems = items;
    //   });
    // }
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.log('Error occurred while fetching products:', error);
      }
    );
  }

  // addToCart(products:any){
  //   this.cartService.addToCart(products).subscribe((res)=>{
  //     console.log(res,"res");
  //     window.alert("Added to cart successFully");
  //   })
  // }

  addToCart(product: any): void {
    const existingCartItem = this.cartItems?.find(item => item.id === product.id);
    if (existingCartItem) {
      existingCartItem.count++; 
    } else {
      product.count = 1; 
       this.cartService.addToCart(product).subscribe((res)=>{
      console.log(res,"res");
      window.alert("Added to cart successFully");
    })
      
    }
  }

  getProductButtonText(product: any): string {
    const cartItem = this.cartItems?.find(item => item.id === product.id);
    return cartItem ? `Count: ${cartItem.count}` : 'Add to Cart';
  }
}