import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { filters, singleFilter } from './FilterData';
import { vegPage } from 'src/Data/vegetable';
import { ActivatedRoute, Router } from '@angular/router';
import { vegPage1 } from 'src/Data/veg';
import { ProductService } from 'src/app/State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterData:any
  singleFilterData:any
  products:any;
  vegetables:any
  lavelThree:any

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private productService: ProductService,
    private store: Store<AppState>
  ) {
    //console.log("Inside constructor");
   }

  //console.log("Inside ngOnInit");
  ngOnInit() {
    //console.log("Inside ngOnInit");
    this.filterData=filters;
    this.singleFilterData=singleFilter;
    this.vegetables=vegPage1;

    const params = this.activatedRoute.snapshot.paramMap;
  console.log("params snapshot", params);

    this.activatedRoute.paramMap.subscribe((params)=>{
        console.log("params",params);
        this.lavelThree=params.get("lavelThree")
        var reqData={
          category: params.get("lavelThree"),
          colors:[],
          sizes:[],
          minPrice:0,
          maxPrice:2000,
          minDiscount:0,
          pageNumber:0,
          pageSize:10,
          stock:null,
        };
        this.productService.findProductsByCategory(reqData);
        console.log("Data", reqData);
      }
    );
    /*this.activatedRoute.queryParams.subscribe(
      (params)=>{
        const color=params["color"]
        const size=params["size"]
        const price=params["price"]
        const discount=params["disscout"]
        const stock=params["stock"]
        const sort=params["sort"]
        const pageNumber=params["pageNumber"]
        const minPrice=price?.split("-")[0];
        const maxPrice=price?.split("-")[1];

        var reqData={
          category: this.lavelThree,
          colors:color? [color].join(","):[],
          sizes:size,
          minPrice:minPrice?minPrice:0,
          maxPrice:maxPrice?maxPrice:0,
          minDiscount: discount?discount:0,
          pageNumber:pageNumber?pageNumber:0,
          pageSize:10,
          stock:null,
          sort:sort?sort:"price_low"
        };
        this.productService.findProductsByCategory(reqData);
      }
    )*/


    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
     console.log("Subscription triggered", product);
        this.products=product.products.content;
        console.log("store data",product.products.content )
       });
  }


  handleMultipleSelectFilter(value:string, sectionId: string)
  {
    const queryParams={...this.activatedRoute.snapshot.queryParams};
    const filterValues= queryParams[sectionId]?queryParams[sectionId].split(","):[];
    const valueIndex = filterValues.indexOf(value);

    if(valueIndex!=-1)
    {
      filterValues.splice(valueIndex,1);
    }
    else{
      filterValues.push(value);
    }

    if(filterValues.length>0)
    {
      queryParams[sectionId]=filterValues.join(",");
    }
    else{
      delete queryParams[sectionId];
    }

    this.router.navigate([],{queryParams});
  }

  handleSingleSelectFilter(value:string, sectionId:string)
  {
    const queryParams={...this.activatedRoute.snapshot.queryParams};
    queryParams[sectionId]=value;

    this.router.navigate([],{queryParams});
  }



}
