import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StoresService } from 'src/app/services/stores/stores.service';
// import { Store } from './store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores: [];

  token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjIxNDQ2ODI5fQ.Gm67L6y9l50dUDWALEY49_KrnP1Rb3n-xRJsXtjjp5U';

  constructor(private fb: FormBuilder, private storesService: StoresService) {}

  ngOnInit(): void {
    this.getStores();
  }

  getStores() {
    this.storesService.getAllStores().subscribe((res) => {
      console.log(res);
      this.stores = res.stores;
    });
  }

  deleteStore(id) {
    this.storesService.deleteStores(id, this.token).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getStores();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );
    console.log('delete clicked ', id);
  }
}
