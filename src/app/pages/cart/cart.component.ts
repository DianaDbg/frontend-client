import { Component, ViewChild, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  products = [];
  bestSelling = [];
  goodStuff = [];
  idProduct: any;

  constructor(public cartService: CartService, private productsService: ProductsService) {}

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.getProducts();
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products = this.products.slice(0, 15);
      this.bestSelling = this.products.slice(0, 5);
      this.goodStuff = this.products.slice(1, 8);
    });
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
  suppressionProduict(id) {
    this.idProduct = id;
    this.effacerSwal.fire();
  }
}
