import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { ApiCookieAuth } from '@nestjs/swagger';

export function Auth(roles?: string[]): any {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiCookieAuth(),
  );
}
