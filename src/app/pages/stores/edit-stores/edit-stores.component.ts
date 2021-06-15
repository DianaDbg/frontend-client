import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores/stores.service';
import { Store } from './../store';
import Swal from 'sweetalert2';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-stores',
  templateUrl: './edit-stores.component.html',
  styleUrls: ['./edit-stores.component.scss'],
})
export class EditStoresComponent implements OnInit {
  editStore = new FormGroup({
    name: new FormControl(''),
    // created_at: new FormControl(''),
    // created_by: new FormControl(''),
    store_address: new FormControl(''),
    is_active: new FormControl(''),
  });

  currentUser: any;

  constructor(
    private storesService: StoresService,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    // this.editStore = this.fb.group({
    //   name: ['', Validators.required],
    //   created_at: [''],
    //   created_by: [''],
    //   store_address: ['', Validators.required],
    // });
    this.storesService.getCurrentData(this.router.snapshot.params.id).subscribe((res) => {
      console.log(res.store[0].id);
      this.editStore.patchValue({
        name: res.store[0].name,
        store_address: res.store[0].store_address,
        is_active: res.store[0].is_active,
      });
    });
  }

  onSubmit() {
    this.storesService.getCurrentData(this.router.snapshot.params.id).subscribe((response) => {
      console.log(response);
    });

    const store = {
      id: this.router.snapshot.params.id,
      name: this.editStore.get('name').value,
      store_address: this.editStore.get('store_address').value,
      is_active: this.editStore.get('is_active').value,
    };

    this.storesService.upDateStores(this.router.snapshot.params.id, store, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/list-store']);
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        });
      }
    );
  }
}
