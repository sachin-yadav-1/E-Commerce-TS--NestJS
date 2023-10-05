import { v4 as uuid } from "uuid";

export const capitaliseString = (str: string) => `${str.trim().charAt(0).toUpperCase()}${str.slice(1)}`;
export const generateFileName = (ext: string = null): string => (ext ? uuid() + ".ext" : uuid());
