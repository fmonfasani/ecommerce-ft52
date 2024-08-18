import { NextFunction, Request, Response } from 'express';
export function loggerglobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(`Estas utilizando el metodo ${req.method} 
    en la ruta ${req.originalUrl} de manera global,
    el dia ${day}/${month}/${year} a las ${time}`);
  next();
}
