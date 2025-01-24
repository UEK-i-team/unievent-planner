import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../libs/shared/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    // TODO: after change roles to/from array, implement correct logic
    const { user } = context.switchToHttp().getRequest();
    const userRoles = user.role.map((role) => role.name);
    if (!userRoles.some((role) => requiredRoles.includes(role))) {
      throw new ForbiddenException('You do not have the required roles');
    }
    return true;
  }
}
