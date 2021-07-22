import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { StripeModule } from 'stripe-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { SearchComponent } from './components/shared/search/search.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoriesComponent } from './pages/categories/create-categories/create-categories.component';
import { UpdateCategoriesComponent } from './pages/categories/update-categories/update-categories.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { SellerOrderComponent } from './pages/order/seller-order/seller-order.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ProductResultComponent } from './pages/products/product-result/product-result.component';
import { ProductsComponent } from './pages/products/products.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { CreateStoresComponent } from './pages/stores/create-stores/create-stores.component';
import { EditStoresComponent } from './pages/stores/edit-stores/edit-stores.component';
import { StoresComponent } from './pages/stores/stores.component';
import { ConditionUsedComponent } from './pages/user/condition-used/condition-used.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { ResetPassEmailComponent } from './pages/user/reset-password/reset-pass-email/reset-pass-email.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FilterMinMaxPricePipe } from './pipes/filter-min-max-price.pipe';
import { FilterPricePipe } from './pipes/filter-price.pipe';

import { SharedModule } from './shared/shared.module';
import { MasterModule } from './pages/master/master.module';
import { FooterModule } from './components/footer/footer.module';

export const rootLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http);

export const applicationInitializerFactory = (translate: TranslateService, injector: Injector) => async () => {
  await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

  const deaultLang = 'en';
  translate.addLangs(['en', 'fr', 'de']);
  translate.setDefaultLang(deaultLang);
  try {
    await translate.use(deaultLang).toPromise();
  } catch (err) {
    console.log(err);
  }
};

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UpdateProfileComponent,
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProductsComponent,
    UpdateProductComponent,
    StoresComponent,
    EditStoresComponent,
    CreateStoresComponent,
    CreateProductComponent,
    CategoriesComponent,
    CreateCategoriesComponent,
    HomeComponent,
    ResetPasswordComponent,
    MenuComponent,
    CheckoutComponent,
    ProductDetailComponent,
    CartComponent,
    ResetPassEmailComponent,
    UpdateCategoriesComponent,
    CategoryPageComponent,
    ProfileComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ConditionUsedComponent,
    SellerOrderComponent,
    SearchBarComponent,
    ProductResultComponent,
    SearchComponent,
    WishlistComponent,
    FilterPricePipe,
    FilterMinMaxPricePipe,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    StripeModule.forRoot(
      'pk_test_51HQ3ZXFunRLoLWctiy0l6VVOeflU8ES2IRjTyY7LL9rEpKedBIfOfKB1BSSftQk4Qmke8HdtRcdmje7R2whuWgTz00U7HXpwjn'
    ),

    SharedModule,
    MasterModule,
    FooterModule, // is this needed here?
  ],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
