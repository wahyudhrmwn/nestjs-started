import { ApiSuccessResponse, ApiErrorResponse } from '../interfaces/api-response.interface';

/**
 * Utility class untuk membuat response API yang konsisten
 * Semua method bersifat static sehingga bisa dipanggil tanpa membuat instance
 * Tujuan: Standarisasi format response di seluruh aplikasi
 */
export class ResponseUtil {
  
  /**
   * Method untuk membuat response success dengan data
   * @param data - Data yang akan dikembalikan ke client
   * @param message - Pesan success (default: 'Operation successful')
   * @param status - HTTP status code (default: 200)
   * @returns Object response dengan format ApiSuccessResponse
   */
  static success<T>(data: T, message: string = 'Operation successful', status: number = 200): ApiSuccessResponse<T> {
    return {
      status,                                // HTTP status code
      message,                              // Pesan deskriptif
      data,                                // Data hasil operasi
      timestamp: new Date().toISOString(),  // Timestamp saat response dibuat
    };
  }

  /**
   * Method untuk membuat response success tanpa data
   * Digunakan untuk operasi yang tidak mengembalikan data (seperti delete)
   * @param message - Pesan success
   * @param status - HTTP status code (default: 200)
   * @returns Object response tanpa field data
   */
  static successWithoutData(message: string, status: number = 200): Omit<ApiSuccessResponse<any>, 'data'> {
    return {
      status,                                // HTTP status code
      message,                              // Pesan deskriptif
      timestamp: new Date().toISOString(),  // Timestamp saat response dibuat
    };
  }

  /**
   * Method untuk membuat response error
   * @param message - Pesan error yang user-friendly
   * @param status - HTTP status code (default: 500)
   * @param error - Detail error untuk debugging (optional)
   * @param path - URL path yang menyebabkan error (optional)
   * @returns Object response error dengan format ApiErrorResponse
   */
  static error(message: string, status: number = 500, error?: any, path?: string): ApiErrorResponse {
    return {
      status,                                // HTTP status code
      message,                              // Pesan error
      error: error || null,                 // Detail error (null jika tidak ada)
      timestamp: new Date().toISOString(),  // Timestamp saat error terjadi
      path,                                // URL yang menyebabkan error
    };
  }

  // ========== Helper methods untuk HTTP status codes yang umum ==========

  /**
   * Shortcut untuk response Created (201)
   * Digunakan setelah berhasil membuat resource baru
   * @param data - Data resource yang baru dibuat
   * @param message - Pesan success (default: 'Resource created successfully')
   */
  static created<T>(data: T, message: string = 'Resource created successfully'): ApiSuccessResponse<T> {
    return this.success(data, message, 201);
  }

  /**
   * Shortcut untuk response No Content (204)
   * Digunakan untuk operasi yang berhasil tapi tidak mengembalikan data
   * @param message - Pesan success (default: 'Operation completed successfully')
   */
  static noContent(message: string = 'Operation completed successfully'): Omit<ApiSuccessResponse<any>, 'data'> {
    return this.successWithoutData(message, 204);
  }

  /**
   * Shortcut untuk Bad Request error (400)
   * Digunakan ketika request dari client tidak valid
   * @param message - Pesan error (default: 'Bad request')
   * @param error - Detail error
   * @param path - URL path
   */
  static badRequest(message: string = 'Bad request', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 400, error, path);
  }

  /**
   * Shortcut untuk Unauthorized error (401)
   * Digunakan ketika user belum login atau token tidak valid
   * @param message - Pesan error (default: 'Unauthorized')
   * @param error - Detail error
   * @param path - URL path
   */
  static unauthorized(message: string = 'Unauthorized', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 401, error, path);
  }

  /**
   * Shortcut untuk Forbidden error (403)
   * Digunakan ketika user tidak memiliki permission untuk aksi tersebut
   * @param message - Pesan error (default: 'Forbidden')
   * @param error - Detail error
   * @param path - URL path
   */
  static forbidden(message: string = 'Forbidden', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 403, error, path);
  }

  /**
   * Shortcut untuk Not Found error (404)
   * Digunakan ketika resource yang dicari tidak ditemukan
   * @param message - Pesan error (default: 'Resource not found')
   * @param error - Detail error
   * @param path - URL path
   */
  static notFound(message: string = 'Resource not found', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 404, error, path);
  }

  /**
   * Shortcut untuk Conflict error (409)
   * Digunakan ketika ada konflik data (misal: email sudah terdaftar)
   * @param message - Pesan error (default: 'Conflict')
   * @param error - Detail error
   * @param path - URL path
   */
  static conflict(message: string = 'Conflict', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 409, error, path);
  }

  /**
   * Shortcut untuk Internal Server Error (500)
   * Digunakan ketika terjadi error yang tidak terduga di server
   * @param message - Pesan error (default: 'Internal server error')
   * @param error - Detail error
   * @param path - URL path
   */
  static internalServerError(message: string = 'Internal server error', error?: any, path?: string): ApiErrorResponse {
    return this.error(message, 500, error, path);
  }
} 