import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para manejar formularios
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';
import { selectAllProducts } from '../../store/selectors/product.selectors';
import { Product } from '../../models/Product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,MatInputModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products$: Observable<Product[]>;
  newProduct: Product = { id: '', nombre: '', precio: 0 };

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  addProduct() {
    if (!this.newProduct.nombre || this.newProduct.precio <= 0) {
      alert("El producto debe tener un nombre y un precio válido.");
      return;
    }

    const newProduct: Product = { ...this.newProduct, id: Math.random().toString(36).substr(2, 9) };
    this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
    this.newProduct = { id: '', nombre: '', precio: 0 };
  }

  deleteProduct(id: string) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }
}
