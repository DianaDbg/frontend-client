import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthResponded } from 'src/app/models/auth/auth';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = [];
  bestSelling = [];
  goodStuff = [];
  allCountries = ['EUROPE', 'AFRIQUE', 'ASIE', 'AMERIQUE', 'OCEANIE', 'OTHERS'];
  countries = [];
  left = false;
  right = true;
  firstIndex = 0;
  currentUser: AuthResponded;
  lang = false;
  token;
  isIconClicked = false;

  constructor(
    private authService: AuthenticationsService,
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    this.firstIndex = this.firstIndex + 1;
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = true;
    }
    this.getProducts();
  }
  handleLeftClick() {
    if (this.firstIndex > 0) {
      this.left = true;
      this.right = true;
      this.firstIndex = this.firstIndex - 1;
      this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    }
    if (this.firstIndex <= 0) {
      this.firstIndex = 1;
      this.left = false;
      this.right = true;
    }
  }
  addToCart(id: Number) {
    this.isIconClicked = true;
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      this.isIconClicked = false;
    });
  }
  handleRightClick() {
    if (this.allCountries.length - this.firstIndex >= 3) {
      if (this.left && this.right) {
        this.firstIndex = this.firstIndex + 1;
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
      } else {
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
        this.firstIndex = this.firstIndex + 1;
      }
      this.left = true;
      this.right = true;

      if (this.allCountries.length - this.firstIndex <= 3) {
        this.firstIndex = this.allCountries.length - 3;
        this.left = true;
        this.right = false;
      }
    }
  }

  redirectProduct(id, index) {
    this.router.navigate([`/product-detail/${id}/${index}/`]);
  }
  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products = this.products.slice(0, 25);
      this.bestSelling = this.products.slice(0, 10);
      this.goodStuff = this.products.slice(1, 11);
    });
  }

  searchProducts(keyWord: string) {
    if (keyWord) {
      this.router.navigate([`product/${keyWord}`]);
    } else {
      return;
    }
  }

  formatPrice(price: any) {
    var prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  AddWishlist(id: any) {
    this.isIconClicked = true;
    if (!this.currentUser) {
      this.router.navigate(['/register']);
    }
    this.token = this.currentUser['user'].token;
    const products = {
      product: id,
    };
    this.wishlistService.AddToWishlist(products, this.token).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Product added to your Wishlist!',
          showConfirmButton: false,
          timer: 2000,
        });
        this.isIconClicked = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          showConfirmButton: false,
          timer: 2000,
        });
        this.isIconClicked = false;
      }
    );
  }

  imageClicked(id, index) {
    if (!this.isIconClicked) {
      this.redirectProduct(id, index);
    }
  }
}
