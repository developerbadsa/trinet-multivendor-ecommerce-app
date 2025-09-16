import {appError} from "../error-handler";

import {Request, Response} from 'express'

export const errorMiddleware = (err: Error, req:Request , res:Response) => {

if(err instanceof appError){
console.log(`Error: ${req.method} ${req.url} - ${err.message  }`);

return res.status(err.statuscode).json({
    status: 'error',
    message: err.message,
    details: err.details || null
  });

}

console.log("uncontrolled error", err?.message);

return res.status(500).json({
    status: 'error',
    message: ' Internal Server Error'
  });

}