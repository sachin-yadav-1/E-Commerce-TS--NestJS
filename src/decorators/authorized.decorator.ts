import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { RolesGuard } from "src/guards/roles.guard";
import { JwtAuthGuard } from "../guards/jwtAuth.guard";

export function Authorized(...roles: string[]) {
  return applyDecorators(SetMetadata("roles", roles), UseGuards(JwtAuthGuard, RolesGuard));
}
