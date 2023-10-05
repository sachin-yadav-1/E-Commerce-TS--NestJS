import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwtAuth.guard";
import { RolesGuard } from "../guards/roles.guard";

export function Authorized(...roles: string[]) {
  return applyDecorators(SetMetadata("roles", roles), UseGuards(JwtAuthGuard, RolesGuard));
}
