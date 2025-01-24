// TODO: implement usage of permission
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Action,
  PERMISSION_KEY,
  RequiredPermissions,
  Subject,
} from '../../shared';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(
    requiredPermissions: RequiredPermissions[],
    sessionPermissions: RequiredPermissions[],
  ): boolean {
    if (!sessionPermissions || !sessionPermissions.length) {
      throw new ForbiddenException('Invalid permissions');
    }
    const isAdmin = sessionPermissions.some(
      (perm) => perm.subject === Subject.ALL && perm.action === Action.MANAGE,
    );
    if (isAdmin) {
      return true;
    }
    const hasPermission = requiredPermissions.every((neededPermission) =>
      sessionPermissions.some(
        (sessionPermission) =>
          sessionPermission.subject === neededPermission.subject &&
          sessionPermission.action === neededPermission.action,
      ),
    );
    if (!hasPermission) {
      throw new ForbiddenException('Invalid permissions');
    }
    return true;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions =
      this.reflector.get<RequiredPermissions[]>(
        PERMISSION_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<RequiredPermissions[]>(
        PERMISSION_KEY,
        context.getClass(),
      );
    if (!requiredPermissions || !requiredPermissions.length) {
      // console.log('not having permissoins in user');
      throw new ForbiddenException('Invalid permissions');
    }
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    return this.matchRoles(requiredPermissions, session.permissions);
  }
}
