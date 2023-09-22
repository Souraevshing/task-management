import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from '../users/user.entity';

// custom get user decorator to get current logged in user
// sendiing payload to data arg and context is used to convert req to http-req and return it to client
export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
