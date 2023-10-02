import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Request } from "express";
import { Observable, map } from "rxjs";

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();

    let data: any;
    if (req.method === "GET" && Object.keys(req.query).length) data = req.query;
    else if (req.method === "GET" && Object.keys(req.params).length) data = req.params;
    else if ((req.method === "POST" || req.method === "PATCH") && Object.keys(req.body).length) data = req.body;

    if (data && Object.keys(data).includes("id") && !data["id"].trim()) delete data["id"];

    return next.handle().pipe(map((data) => plainToInstance(this.dto, data, { excludeExtraneousValues: true })));
  }
}
