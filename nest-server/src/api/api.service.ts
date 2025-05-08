import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(private readonly httpService: HttpService) { }

    async autorizarTransacao(): Promise<boolean> {
        try {
            const url = 'https://util.devi.tools/api/v2/authorize';
            const response = await lastValueFrom(this.httpService.get(url));
            if (!response.data?.data?.authorization) return false
            return response.data.data.authorization;
        } catch (e) {
            return false;
        }
    }

    async notificarEmail(email: string): Promise<boolean>{
        try {
            const url = 'https://util.devi.tools/api/v1/notify';
            const response = await lastValueFrom(this.httpService.post(url, {email}));
            if (response.status != 204) return false
            return true;
        } catch (e) {
            return false;
        }
    }
}
