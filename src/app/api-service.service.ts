import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl =
    'https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop/users/login';

  async login(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(this.baseUrl, {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
