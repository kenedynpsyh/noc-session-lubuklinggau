import {
  Authorized,
  Body,
  ContentType,
  Controller,
  CurrentUser,
  Get,
  HttpCode,
  Param,
  Post,
  QueryParams,
  Res,
  UploadedFile,
} from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repository/user-repository";
import { UserService } from "../services/user-service";
import { OK, CREATED } from "http-status";
import {
  authorfield,
  baseQuery,
  createdfield,
  loginfield,
  passwordfield,
  resetfield,
  userQuery,
} from "../fields/user-fields";
import { Response } from "express";
import { UserInstance } from "@serve/database/models/auth/user-models";
import { fileUploadOptions } from "@serve/utils/system";

@Controller("user/")
@Service()
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly repository: UserRepository
  ) {}

  @Get()
  @HttpCode(OK)
  @ContentType("application/json")
  @Authorized()
  private async findAllController(
    @QueryParams() query: userQuery,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.repository.findallRepository(query);
    return res.status(OK).json(r);
  }

  @Get("one")
  @HttpCode(OK)
  @ContentType("application/json")
  @Authorized()
  private async findOneController(
    @QueryParams() query: baseQuery,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.repository.findoneRepository(query);
    return res.status(OK).json(r);
  }

  @Post("login")
  @HttpCode(OK)
  @ContentType("application/json")
  private async loginController(
    @Body() body: loginfield,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.loginService(body);
    return res.status(r.status).json(r);
  }

  @Post("created")
  @HttpCode(CREATED)
  @ContentType("application/json")
  private async createdController(
    @Body() body: createdfield,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.createdService(body);
    return res.status(r.status).json(r);
  }

  @Post("reset")
  @HttpCode(OK)
  @ContentType("application/json")
  private async resetController(
    @Body() body: resetfield,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.resetService(body);
    return res.status(r.status).json(r);
  }

  @Post("password")
  @HttpCode(OK)
  @ContentType("application/json")
  @Authorized()
  private async passwordController(
    @Body() body: passwordfield,
    @CurrentUser() user: UserInstance,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.passwordService(body, user.public_id);
    return res.status(r.status).json(r);
  }

  @Post("roles")
  @HttpCode(OK)
  @ContentType("application/json")
  @Authorized()
  private async rolesController(
    @Body() body: authorfield,
    @CurrentUser() user: UserInstance,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.roleService(body, user.public_id);
    return res.status(r.status).json(r);
  }

  @Post("roles/:path")
  @HttpCode(OK)
  @Authorized()
  private async fileController(
    @UploadedFile("file", {
      options: fileUploadOptions("../upload/author"),
    })
    file: Express.Multer.File,
    @Param("path") path: string,
    @CurrentUser() user: UserInstance,
    @Res() res: Response
  ): Promise<Response> {
    const r = await this.service.fileService(file, path, user.public_id);
    return res.status(r.status).json(r);
  }
}
