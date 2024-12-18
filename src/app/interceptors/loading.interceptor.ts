import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
 // Variable to keep track of the total number of ongoing HTTP requests
  private totalRequests = 0;

  constructor(
   
    private loadingService: LoaderService
  ) {}
// 'intercept' function is part of the HttpInterceptor interface
  // This function is called for every outgoing HTTP request
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    // Increment the count of total requests
    this.totalRequests++;
      // Inform the loading service that loading has started
    this.loadingService.setLoading(true);
    
    // 'handle' function calls the next interceptor in the chain or the backend if there's no more interceptor
    // The 'pipe' function is used to chain multiple operators - chains finalize to the next.handle(request)
    return next.handle(request).pipe(
       // 'finalize' is an RxJS operator that is called when the observable completes, whether it ends with a success or an error
      finalize(() => {
        // Decrement the count of total requests
        this.totalRequests--;
         // If there are no more ongoing requests, inform the loading service that loading has ended
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}