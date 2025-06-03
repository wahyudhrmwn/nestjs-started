import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * Module utama aplikasi (Root Module)
 * @Module() decorator mendefinisikan root module dari aplikasi NestJS
 * 
 * AppModule adalah entry point dari aplikasi yang:
 * - Mengkonfigurasi database connection
 * - Mengimpor semua feature modules
 * - Menyediakan global providers (seperti exception filters)
 * - Menghubungkan semua bagian aplikasi
 */
@Module({
  /**
   * imports: Array berisi module-module yang dibutuhkan aplikasi
   */
  imports: [
    /**
     * Konfigurasi database menggunakan TypeORM
     * TypeOrmModule.forRoot() mengkonfigurasi koneksi database global
     */
    TypeOrmModule.forRoot({
      type: 'postgres',           // Jenis database (postgres, mysql, sqlite, dll)
      host: 'localhost',          // Host database server
      port: 5432,                // Port database (5432 adalah default postgres)
      username: 'postgres',       // Username untuk akses database
      password: '123456',         // Password database
      database: 'nestjs_db',      // Nama database yang akan digunakan
      entities: [User],           // Array berisi semua entity yang ada
      synchronize: true,          // Auto-sync schema dengan entity (HANYA UNTUK DEVELOPMENT!)
      // PERINGATAN: synchronize: true JANGAN digunakan di production!
      // Gunakan migration untuk production environment
    }),
    
    /**
     * Import UsersModule untuk fitur user management
     * Module ini berisi semua controller, service, dan repository untuk User
     */
    UsersModule
  ],
  
  /**
   * controllers: Array berisi controller yang ada di root level
   * AppController menangani endpoint root aplikasi
   */
  controllers: [AppController],
  
  /**
   * providers: Array berisi service dan provider lainnya
   */
  providers: [
    // Service utama aplikasi
    AppService,
    
    /**
     * Global Exception Filter
     * Konfigurasi ini membuat HttpExceptionFilter aktif di seluruh aplikasi
     * APP_FILTER adalah token khusus NestJS untuk global filter
     */
    {
      provide: APP_FILTER,           // Token provider untuk global filter
      useClass: HttpExceptionFilter, // Class yang akan digunakan sebagai filter
    },
    // Filter ini akan menangkap semua exception di seluruh aplikasi
    // dan mengubahnya menjadi response JSON yang konsisten
  ],
})
export class AppModule {}
