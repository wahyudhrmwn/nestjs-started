import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO (Data Transfer Object) untuk update data user
 * Menggunakan PartialType() untuk membuat semua property dari CreateUserDto menjadi optional
 * Artinya user bisa update hanya nama saja, atau email saja, atau keduanya
 * 
 * Contoh:
 * - Jika hanya ingin update nama: { name: "Nama Baru" }
 * - Jika hanya ingin update email: { email: "email@baru.com" }
 * - Jika ingin update keduanya: { name: "Nama Baru", email: "email@baru.com" }
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
