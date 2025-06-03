/**
 * Interface utama untuk format response API yang konsisten
 * Digunakan sebagai template dasar untuk semua response dari API
 * Generic <T> memungkinkan type data yang fleksibel
 */
export interface ApiResponse<T = any> {
  status: number;      // Kode status HTTP (200, 404, 500, dll)
  message: string;     // Pesan deskriptif tentang response
  data?: T;           // Data yang dikembalikan (optional, bisa any type)
  error?: any;        // Detail error jika ada (optional)
  timestamp?: string; // Waktu response dibuat (optional)
  path?: string;      // URL endpoint yang dipanggil (optional)
}

/**
 * Interface khusus untuk response yang berhasil (success)
 * Extends dari ApiResponse tapi data wajib ada (tidak optional)
 * Digunakan ketika operasi berhasil dan ada data yang dikembalikan
 */
export interface ApiSuccessResponse<T = any> {
  status: number;     // Kode status HTTP success (200, 201, dll)
  message: string;    // Pesan success
  data: T;           // Data hasil operasi (wajib ada)
  timestamp: string; // Waktu response (wajib ada untuk tracking)
}

/**
 * Interface khusus untuk response error
 * Digunakan ketika terjadi kesalahan dalam proses
 * Tidak memiliki field data karena fokus pada informasi error
 */
export interface ApiErrorResponse {
  status: number;     // Kode status HTTP error (400, 404, 500, dll)
  message: string;    // Pesan error yang user-friendly
  error: any;        // Detail teknis error (untuk debugging)
  timestamp: string; // Waktu error terjadi (wajib untuk logging)
  path?: string;     // URL yang menyebabkan error (optional)
} 