import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private _http: HttpClient) { }
  
  //_urlLogin='https://bluealgo.com:8083/portal/getCustomerPaymentStats';
  
  userAuthentication(loginData){
	  return this._http.post<any>('http://199.217.112.145:8089/fma/api/auth/sign_in', loginData );
	 
 }
  
}
