import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { StoresService } from 'src/app/services/stores/stores.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';
import { CategoriesService } from './../../services/categories/categories.service';
import { Category } from './../../models/category/category';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Store } from '../stores/store';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

uuidv4();

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  submited = false;
  products = [];
  stores: [];
  categorys: Category;
  closeResult = '';
  currentUser: any;
  cartData: CartModelServer;
  userType: string;
  disabledBtn = false;
  idProduct: any;
  store: Store;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private storesService: StoresService,
    private authService: AuthenticationsService,
    private cartService: CartService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
    this.getProducts();
    this.getCategory();
    this.getStore();

    this.userType = this.currentUser.user.account_type;
    if (this.userType === 'CUSTOMER') {
      this.disabledBtn = true;
    }
  }

  getStore() {
    this.storesService.getAllStores().subscribe((data) => {
      this.stores = data.results;
    });
    // return this.store.name;
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      const product = data.results;
      if (product.length > 0) {
        product.forEach((element) => {
          this.authService.getUserById(element['created_by']).subscribe((data) => {
            if (data['user'][0].email === this.currentUser.user.email) {
              this.storesService.getCurrentData(element['store']).subscribe(
                (data) => {
                  element.store = data.store[0].name;
                },
                (error) => {
                  console.log(error);
                }
              );
              this.products.push(element);
            }
          });
        });
      }
    });
    console.log(this.products);
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categorys = data.results;
    });
  }

  onSubmit() {
    this.submited = true;
  }

  deleteProducts() {
    this.productsService.deleteProduct(this.idProduct, this.currentUser.user.token).subscribe(
      (d) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The product has been deleted!',
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
  suppressionProduct(id) {
    this.idProduct = id;
    console.log(this.idProduct);
    this.effacerSwal.fire();
  }
  addProducts(id) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}
