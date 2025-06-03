import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUtil } from '../common/utils/response.util';
import { ApiSuccessResponse } from '../common/interfaces/api-response.interface';
import { User } from './entities/user.entity';

/**
 * Controller untuk menangani semua endpoint yang berkaitan dengan User
 * @Controller('users') membuat base route menjadi '/users'
 * Semua endpoint di dalam controller ini akan diawali dengan '/users'
 */
@Controller('users')
export class UsersController {
  /**
   * Constructor untuk inject UsersService
   * Menggunakan dependency injection pattern dari NestJS
   * @param usersService - Service layer yang berisi business logic untuk User
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint untuk membuat user baru
   * @Post() decorator membuat HTTP POST endpoint
   * Route: POST /users
   * @param createUserDto - Data user yang akan dibuat (dari request body)
   * @returns Promise dengan response success berisi data user yang baru dibuat
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiSuccessResponse<User>> {
    try {
      // Panggil service layer untuk membuat user baru
      const user = await this.usersService.create(createUserDto);
      // Return response success dengan format yang konsisten
      return ResponseUtil.success(user, 'User created successfully');
    } catch (error) {
      // Jika terjadi error, throw error agar ditangani oleh exception filter
      throw error;
    }
  }

  /**
   * Endpoint untuk mengambil semua data user
   * @Get() decorator membuat HTTP GET endpoint
   * Route: GET /users
   * @returns Promise dengan response success berisi array semua user
   */
  @Get()
  async findAll(): Promise<ApiSuccessResponse<User[]>> {
    try {
      // Panggil service layer untuk mengambil semua user
      const users = await this.usersService.findAll();
      // Return response success dengan data array user
      return ResponseUtil.success(users, 'Users retrieved successfully');
    } catch (error) {
      // Jika terjadi error, throw error agar ditangani oleh exception filter
      throw error;
    }
  }

  /**
   * Endpoint untuk mengambil data user berdasarkan ID
   * @Get(':id') decorator membuat HTTP GET endpoint dengan parameter
   * Route: GET /users/:id (contoh: GET /users/1)
   * @param id - ID user yang dicari (dari URL parameter)
   * @returns Promise dengan response success berisi data user
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiSuccessResponse<User>> {
    try {
      // Convert string ID ke number dan panggil service layer
      const user = await this.usersService.findOne(+id);
      // Return response success dengan data user
      return ResponseUtil.success(user, 'User retrieved successfully');
    } catch (error) {
      // Jika terjadi error (misal user tidak ditemukan), throw error
      throw error;
    }
  }

  /**
   * Endpoint untuk update data user
   * @Patch(':id') decorator membuat HTTP PATCH endpoint
   * Route: PATCH /users/:id (contoh: PATCH /users/1)
   * @param id - ID user yang akan diupdate (dari URL parameter)
   * @param updateUserDto - Data yang akan diupdate (dari request body)
   * @returns Promise dengan response success berisi data user yang sudah diupdate
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ApiSuccessResponse<User>> {
    try {
      // Convert string ID ke number dan panggil service layer untuk update
      const user = await this.usersService.update(+id, updateUserDto);
      // Return response success dengan data user yang sudah diupdate
      return ResponseUtil.success(user, 'User updated successfully');
    } catch (error) {
      // Jika terjadi error (misal user tidak ditemukan), throw error
      throw error;
    }
  }

  /**
   * Endpoint untuk menghapus user
   * @Delete(':id') decorator membuat HTTP DELETE endpoint
   * Route: DELETE /users/:id (contoh: DELETE /users/1)
   * @param id - ID user yang akan dihapus (dari URL parameter)
   * @returns Promise dengan response success tanpa data (karena sudah dihapus)
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Omit<ApiSuccessResponse<any>, 'data'>> {
    try {
      // Convert string ID ke number dan panggil service layer untuk delete
      await this.usersService.remove(+id);
      // Return response success tanpa data karena resource sudah dihapus
      return ResponseUtil.successWithoutData('User deleted successfully');
    } catch (error) {
      // Jika terjadi error (misal user tidak ditemukan), throw error
      throw error;
    }
  }
}
