import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { ProductService } from 'src/app/State/Product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private store: Store<AppState>) {
    this.productForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discountedPrice: ['', Validators.required],
      discountPercent: ['', Validators.required],
      storename: ['', Validators.required],
      color: ['', Validators.required],
      size: this.fb.array([]),
      imageUrl: ['', Validators.required],
      topLevelCategory: ['', Validators.required],
      secondLevelCategory: ['', Validators.required],
      thirdLevelCategory: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load products if needed
    // this.loadProducts();
  }

  get sizesArray(): FormArray {
    return this.productForm.get('size') as FormArray;
  }

  onSubmit(): void {
      this.productService.createProduct(this.productForm.value);
      this.productForm.reset();
  }

  addSize(): void {
    const sizeGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.sizesArray.push(sizeGroup);
  }

  removeSize(index: number): void {
    this.sizesArray.removeAt(index);
  }
}
