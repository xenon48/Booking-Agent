import { Injectable, BadRequestException } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const userId = req.body?.user_id;

    if (!userId || !Number.isInteger(userId)) {
      throw new BadRequestException('userId is required for rate limiting');
    }

    return `user:${userId}`;
  }
}