import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

/**
 * Module untuk fitur Users
 * @Module() decorator mendefinisikan sebuah module di NestJS
 * Module adalah cara untuk mengorganisir dan mengelompok aplikasi
 * 
 * Module ini mengelola semua yang berkaitan dengan User:
 * - Database repository
 * - Service (business logic)
 * - Controller (HTTP endpoints)
 */
@Module({
  /**
   * imports: Module-module lain yang dibutuhkan oleh UsersModule
   * TypeOrmModule.forFeature([User]) membuat repository User tersedia untuk di-inject
   * Ini memungkinkan UsersService untuk menggunakan User repository
   */
  imports: [TypeOrmModule.forFeature([User])],
  
  /**
   * controllers: Array berisi semua controller yang ada di module ini
   * Controller menangani HTTP requests dan routing
   */
  controllers: [UsersController],
  
  /**
   * providers: Array berisi semua service/provider yang bisa di-inject
   * Service berisi business logic dan bisa digunakan oleh controller atau service lain
   */
  providers: [UsersService],
  
  // exports: Jika module lain perlu menggunakan service dari module ini
  // Tidak ada exports di sini karena UsersService hanya digunakan internal
})
export class UsersModule {}
