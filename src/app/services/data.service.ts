import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Employee } from '../models/Employee';
import { Product } from '../models/Product';
import { EmployeeDebt } from '../models/EmployeeDebt';
import { ProductSold } from '../models/ProductSold';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'http://localhost:8081';
  private EMPLOYEE_URL = `${this.BASE_URL}/employee`;
  private PRODUCTS_URL = `${this.BASE_URL}/product`;
  private CR_PURCH_URL = `${this.BASE_URL}/purchase`;
  private CR_PHP_URL = `${this.BASE_URL}/php`;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EMPLOYEE_URL);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_URL);
  }

  getProductSoldByMonth(month: number): Observable<ProductSold[]> {
    return this.http.get<ProductSold[]>(`${this.PRODUCTS_URL}/sold/${month}`);
  }

  getDebtOfEmployeesByMonth(month: number): Observable<EmployeeDebt[]> {
    return this.http.get<EmployeeDebt[]>(`${this.EMPLOYEE_URL}/debt/${month}`);
  }

  createPurchase(employeeId: number): Observable<number> {
    return this.http.post<number>(`${this.CR_PURCH_URL}/${employeeId}`, null);
  }

  createPurchaseHasProduct(prodId: number, amt: number, phPriceTotal: number, purchId: number): Observable<void> {
    return this.http.post<void>(`${this.CR_PHP_URL}/${purchId}/${prodId}/${amt}/${phPriceTotal}`, null);
  }
}
