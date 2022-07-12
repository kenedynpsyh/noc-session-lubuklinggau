import { IsString } from "class-validator";

export class createdfield {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmation: string
}

export class loginfield {
  @IsString()
  token: string;

  @IsString()
  password: string;
}


export class resetfield {
  @IsString()
  email: string;
}

export class passwordfield {
  @IsString()
  old: string;

  @IsString()
  password: string;

  @IsString()
  confirmation: string;
}

export class userQuery {
  @IsString()
  email: string;
}

export class baseQuery {
  @IsString()
  public_id:string
}
