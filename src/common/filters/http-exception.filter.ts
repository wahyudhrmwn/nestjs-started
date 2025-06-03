import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseUtil } from '../utils/response.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Method utama yang akan dipanggil ketika ada exception terjadi
   * @param exception - Exception yang terjadi (bisa HttpException atau error lainnya)
   * @param host - ArgumentsHost yang berisi context dari request
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // Mendapatkan HTTP context dari ArgumentsHost
    const ctx = host.switchToHttp();
    // Mendapatkan object response untuk mengirim response ke client
    const response = ctx.getResponse<Response>();
    // Mendapatkan object request untuk mengambil informasi request
    const request = ctx.getRequest<Request>();

    // Deklarasi variabel untuk status code dan message error
    let status: number;
    let message: string;

    // Mengecek apakah exception adalah instance dari HttpException
    if (exception instanceof HttpException) {
      // Jika ya, ambil status code dari exception
      status = exception.getStatus();
      // Ambil response dari exception (bisa berupa string atau object)
      const exceptionResponse = exception.getResponse();
      
      // Jika response berupa string, langsung gunakan sebagai message
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } 
      // Jika response berupa object, ambil property message-nya
      else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || exception.message;
      } 
      // Jika tidak ada response yang jelas, gunakan message dari exception
      else {
        message = exception.message;
      }
    } 
    // Jika bukan HttpException, berarti error yang tidak terduga
    else {
      // Set status sebagai Internal Server Error (500)
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // Membuat response error menggunakan ResponseUtil
    const errorResponse = ResponseUtil.error(
      message,  // Pesan error
      status,   // Status code HTTP
      {
        statusCode: status,                    // Status code untuk informasi tambahan
        timestamp: new Date().toISOString(),  // Waktu terjadinya error
        path: request.url,                     // URL endpoint yang error
      },
      request.url, // Path request
    );

    // Mengirim response error ke client dengan status code yang sesuai
    response.status(status).json(errorResponse);
  }
} 