import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WatchDto } from '../watch.dto';

@Injectable()
export class FlightService {
  async checkFare(dto: WatchDto) {
    const payload = {
      ...dto,
      lookUpType: 3,
    };

    try {
      const response = await axios.post(
        'https://api.flytoday.ir/api/V1/Flight/FareLookUp',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('FlyToday API error:', error.message);
      throw new Error('Flight lookup failed');
    }
  }
}
