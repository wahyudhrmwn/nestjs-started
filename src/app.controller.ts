// Import decorator dan class yang dibutuhkan dari NestJS
import { Controller, Get } from '@nestjs/common';
// Import service yang akan digunakan oleh controller
import { AppService } from './app.service';

/**
 * Controller utama aplikasi (Root Controller)
 * @Controller() tanpa parameter membuat base route menjadi '/'
 * Controller ini menangani endpoint root aplikasi
 * Biasanya digunakan untuk health check atau informasi dasar aplikasi
 */
@Controller()
export class AppController {
  /**
   * Constructor untuk inject AppService
   * Menggunakan dependency injection pattern dari NestJS
   * @param appService - Service yang berisi logic untuk controller ini
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint root aplikasi
   * @Get() decorator membuat HTTP GET endpoint di path '/'
   * Route: GET / (contoh: http://localhost:3000/)
   * @returns string - Pesan sederhana dari service
   * 
   * Endpoint ini berguna untuk:
   * - Health check (mengecek apakah aplikasi masih hidup)
   * - Welcome message
   * - Informasi dasar aplikasi
   */
  @Get()
  getHello(): string {
    // Memanggil method dari service dan return hasilnya
    return this.appService.getHello();
  }
}
