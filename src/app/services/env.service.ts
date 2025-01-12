import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public authAddress: string = (window as any).__env.authAddress || '';
  public backendAddress: string = (window as any).__env.backendAddress || '';
  public frontendAddress: string = (window as any).__env.frontendAddress || '';
}
