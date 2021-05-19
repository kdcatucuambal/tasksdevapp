import { createParamDecorator, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';

export const Auth = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Partial<any> => {
        try {
            const request: Request = ctx.switchToHttp().getRequest();
            return request['user']
        } catch (error) {
            throw new ForbiddenException();
        }

    });
