import { Injectable } from '@nestjs/common';

/**
 * Service utama aplikasi (Root Service)
 * @Injectable() decorator membuat class ini bisa di-inject sebagai dependency
 * 
 * Service ini berisi business logic sederhana untuk controller utama
 * Dalam aplikasi yang lebih besar, service ini bisa berisi:
 * - Logic untuk health check
 * - Informasi versi aplikasi
 * - Statistik dasar aplikasi
 * - Configuration global
 */
@Injectable()
export class AppService {
  /**
   * Method untuk mengembalikan pesan hello world
   * @returns string - Pesan sederhana "Hello World!"
   * 
   * Method ini sangat sederhana tapi menunjukkan:
   * - Cara kerja service layer
   * - Bagaimana controller memanggil service
   * - Pattern yang akan digunakan untuk logic yang lebih kompleks
   */
  getHello(): string {
    // Return pesan sederhana
    // Dalam aplikasi nyata, bisa berisi logic yang lebih kompleks
    return 'Hello World!';
  }
}
