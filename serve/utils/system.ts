import fs from "fs";
import { join } from "path";
import multer from "multer";
import { nanoid } from "nanoid";

export const createPath = (path: string, data: string) => {
  fs.writeFileSync(join(__dirname, path), data);
};

export const readPath = (path: string): string => {
  return fs.readFileSync(join(__dirname, path), { encoding: "utf-8" });
};

export const joinPath = (path: string): string => {
  return join(__dirname, path);
};

export const removePath = (path: string) => {
  fs.unlinkSync(join(__dirname, path));
};

export const ticket = fs.readFileSync(join(__dirname, "./jwtRS256.key"), {
  encoding: "utf-8",
});

export const fileUploadOptions = (path: string) => ({
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, joinPath(path));
    },
    filename: (req: any, file: Express.Multer.File, cb: any) => {
      cb(null, `${nanoid()}.${file.mimetype.split("/")[1]}`);
    },
  }),
});

const fields = {};
try {
  fields["user"] = JSON.parse(readPath("../../tests/user.txt"));
} catch (error) {}
try {
  fields["token"] = readPath("../../tests/token.txt");
} catch (error) {}

export { fields };
