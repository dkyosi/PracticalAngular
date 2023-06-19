import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = environment.apiUrl;

  currentUser:any = {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  constructor(private httpClient: HttpClient) { }

  mainPostCalls(postData: any, url: any) {
    console.log(this.url + url)
    return this.httpClient.post(this.url + url, postData, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  mainGetCalls(url: any) {
    return this.httpClient.get(this.url + url, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  mainPutCalls(postData: any, url: any) {
    return this.httpClient.put(this.url + url, postData, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  mainDeleteCalls(url: any) {
    return this.httpClient.delete(this.url + url, this.httpOptions)
      .pipe(retry(0),
        catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }

    return throwError(error);
  }

}
