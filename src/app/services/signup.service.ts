import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SignupService {

	
//_url='https://bluealgo.com:8083/portal/getCustomerPaymentStats';

  constructor( 
  private _http: HttpClient

  ) { }
  
  
 
  
  public register(userData){
	  return this._http.post<any>('http://199.217.112.145:8089/fma/api/auth/sign_up', userData );
  } 
  
  
  
  
}
