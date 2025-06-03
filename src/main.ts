// Import NestFactory untuk membuat aplikasi NestJS
import { NestFactory } from '@nestjs/core';
// Import root module aplikasi
import { AppModule } from './app.module';

/**
 * Function bootstrap adalah entry point utama aplikasi
 * Function ini akan dijalankan pertama kali saat aplikasi dimulai
 * 
 * Tugasnya:
 * - Membuat instance aplikasi NestJS
 * - Mengkonfigurasi aplikasi (middleware, pipes, guards, dll)
 * - Menjalankan server HTTP
 */
async function bootstrap() {
  /**
   * Membuat aplikasi NestJS menggunakan AppModule sebagai root module
   * NestFactory.create() akan:
   * - Memproses semua decorator dan metadata
   * - Melakukan dependency injection
   * - Menginisialisasi semua module, controller, dan service
   */
  const app = await NestFactory.create(AppModule);
  
  // Di sini bisa ditambahkan konfigurasi global seperti:
  // app.useGlobalPipes(new ValidationPipe()); // Global validation
  // app.useGlobalGuards(new AuthGuard());     // Global authentication
  // app.enableCors();                         // Enable CORS
  // app.setGlobalPrefix('api');               // Global prefix untuk semua route
  
  /**
   * Menjalankan aplikasi pada port tertentu
   * process.env.PORT: Mengambil port dari environment variable (untuk deployment)
   * ?? 3000: Jika PORT tidak ada, gunakan port 3000 sebagai default
   * 
   * Setelah berjalan, aplikasi bisa diakses di:
   * http://localhost:3000 (jika menggunakan port default)
   */
  await app.listen(process.env.PORT ?? 3000);
  
  // Optional: Menampilkan informasi bahwa server sudah berjalan
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}

/**
 * Menjalankan function bootstrap
 * .catch() untuk menangkap error yang mungkin terjadi saat startup
 */
bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1); // Exit dengan kode error
});
