import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
      if(localStorage.getItem('access-token')!=null){
        return next.handle(
          req.clone({
            headers: req.headers.append('Authorization',`Bearer ${localStorage.getItem('access-token')}`)
          })
        );
      }
      else{
        return next.handle(req);
      }
  }
}
