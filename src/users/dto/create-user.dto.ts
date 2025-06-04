/**
 * DTO (Data Transfer Object) untuk membuat user baru
 * DTO adalah class yang mendefinisikan struktur data yang diterima dari client
 * Digunakan untuk validasi dan type safety saat menerima request
 */
export class CreateUserDto {
  /**
   * Nama lengkap user yang akan dibuat
   * Type: string - wajib diisi
   */
  name: string;
  
  /**
   * Alamat email user yang akan dibuat
   * Type: string - wajib diisi dan harus unique
   * Biasanya akan ditambahkan validasi email format
   */
  email: string;

  /**
   * Role user yang akan dibuat
   * Type: string - wajib diisi dan harus unique
   * Biasanya akan ditambahkan validasi role format
   */
  role: string;

  /**
   * Status user yang akan dibuat
   * Type: string - wajib diisi dan harus unique
   * Biasanya akan ditambahkan validasi status format
   */
  status: string;
}
  