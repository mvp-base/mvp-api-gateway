import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getStatus() {
    return { status: 'running' };
  }
}
