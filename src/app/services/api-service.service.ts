import { Injectable } from '@angular/core';
import { API_ROUTES } from '../utils/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  async validUsername(username: string): Promise<any> {
    try {
      const url = API_ROUTES.VALIDATE_USERNAME;
      const params = new HttpParams().set('username', username);

      const response = await this.http.get(url, { params }).toPromise();
      return response;
    } catch (err) {
      throw err;
    }
  }
}
