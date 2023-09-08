import fs from 'fs';
import { readdir } from 'fs/promises';
import winston from 'winston';

export async function checkDirectoryExists(targetFolder: string) {
  return fs.existsSync(targetFolder);
}

export async function checkFileExists(filePath: string) {
  return fs.existsSync(filePath)
}

export async function readDirectory(targetFolder: string): Promise<string[]> {
  return readdir(targetFolder);
}

export function sanitizeData(files: string[] | string): string[] {
  if (Array.isArray(files)) {
    return files.filter(item => item !== '.gitkeep');
  } else {
    return [];
  }
}

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});
