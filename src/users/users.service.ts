import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Service layer untuk business logic User
 * @Injectable() decorator membuat class ini bisa di-inject sebagai dependency
 * Service layer bertugas:
 * - Menangani business logic
 * - Berinteraksi dengan database melalui repository
 * - Validasi data business rule
 * - Throw exception jika terjadi error
 */
@Injectable()
export class UsersService {
  /**
   * Constructor untuk inject User repository
   * @InjectRepository(User) memberitahu NestJS untuk inject repository User
   * @param userRepository - Repository untuk melakukan operasi database pada entity User
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Method untuk membuat user baru
   * @param createUserDto - Data user baru yang akan dibuat
   * @returns Promise<User> - Data user yang berhasil dibuat
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Membuat instance User baru berdasarkan DTO
    const user = this.userRepository.create(createUserDto);
    // Menyimpan user ke database dan return hasilnya
    return await this.userRepository.save(user);
  }

  /**
   * Method untuk mengambil semua data user
   * @returns Promise<User[]> - Array berisi semua user
   */
  async findAll(): Promise<User[]> {
    // Mengambil semua data user dari database
    return await this.userRepository.find();
  }

  /**
   * Method untuk mencari user berdasarkan ID
   * @param id - ID user yang dicari
   * @returns Promise<User> - Data user yang ditemukan
   * @throws NotFoundException - Jika user dengan ID tersebut tidak ditemukan
   */
  async findOne(id: number): Promise<User> {
    // Mencari user berdasarkan ID
    const user = await this.userRepository.findOne({ where: { id } });
    
    // Jika user tidak ditemukan, throw NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    // Return user yang ditemukan
    return user;
  }

  /**
   * Method untuk update data user
   * @param id - ID user yang akan diupdate
   * @param updateUserDto - Data yang akan diupdate
   * @returns Promise<User> - Data user yang sudah diupdate
   * @throws NotFoundException - Jika user dengan ID tersebut tidak ditemukan
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Update data user berdasarkan ID
    // Method update() tidak return data yang diupdate, hanya info operasi
    await this.userRepository.update(id, updateUserDto);
    
    // Mengambil data user yang sudah diupdate untuk dikembalikan
    // Method findOne() sudah include pengecekan apakah user ada atau tidak
    return await this.findOne(id);
  }

  /**
   * Method untuk menghapus user
   * @param id - ID user yang akan dihapus
   * @returns Promise<void> - Tidak mengembalikan data (void)
   * @throws NotFoundException - Jika user dengan ID tersebut tidak ditemukan
   */
  async remove(id: number): Promise<void> {
    // Menghapus user berdasarkan ID
    const result = await this.userRepository.delete(id);
    
    // Mengecek apakah ada data yang terhapus
    // result.affected berisi jumlah row yang terpengaruh operasi delete
    if (result.affected === 0) {
      // Jika tidak ada data yang terhapus, berarti user tidak ditemukan
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    // Jika berhasil menghapus, method tidak return apapun (void)
  }
}
