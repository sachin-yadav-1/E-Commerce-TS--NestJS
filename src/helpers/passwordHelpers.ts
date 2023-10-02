import * as bcrypt from "bcrypt";

export const encryptPass = async (pass: string): Promise<string> => await bcrypt.hash(pass, 12);
export const verifyPass = async (pass: string, dbPass: string): Promise<boolean> => await bcrypt.compare(pass, dbPass);
