import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): String => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.id;
  },
);
