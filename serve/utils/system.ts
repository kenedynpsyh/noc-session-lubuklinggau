import fs from "fs";
import { join } from "path";

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

const fields = {};
try {
  fields["user"] = JSON.parse(readPath("../../tests/user.txt"));
} catch (error) {}
try {
  fields["token"] = readPath("../../tests/token.txt");
} catch (error) {}

export { fields };
