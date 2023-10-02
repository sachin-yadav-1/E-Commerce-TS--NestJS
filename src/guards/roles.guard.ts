import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this._reflector.get<string[]>("roles", context.getHandler());

    if (!roles || !roles.length) return true;

    const request = context.switchToHttp().getRequest();
    return roles.includes(request.user.role) ? true : false;
  }
}
