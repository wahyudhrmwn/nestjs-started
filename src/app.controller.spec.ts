// Import utilities untuk testing dari NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import class yang akan ditest
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Test suite untuk AppController
 * describe() adalah function dari Jest untuk mengelompokkan test cases
 * Test ini memastikan controller utama aplikasi berfungsi dengan benar
 */
describe('AppController', () => {
  // Deklarasi variabel untuk menyimpan instance controller yang akan ditest
  let appController: AppController;

  /**
   * beforeEach() dijalankan sebelum setiap test case
   * Berfungsi untuk setup/persiapan yang diperlukan untuk testing
   */
  beforeEach(async () => {
    /**
     * Membuat testing module menggunakan Test.createTestingModule()
     * Testing module ini mirip dengan AppModule tapi khusus untuk testing
     * Hanya mengandung komponen yang diperlukan untuk test
     */
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Controller yang akan ditest
      providers: [AppService],      // Service dependency yang dibutuhkan
    }).compile(); // compile() untuk build testing module

    // Mengambil instance AppController dari testing module
    appController = app.get<AppController>(AppController);
  });

  /**
   * Test group untuk endpoint root
   * describe() nested untuk mengelompokkan test berdasarkan endpoint
   */
  describe('root', () => {
    /**
     * Test case: memastikan endpoint root mengembalikan "Hello World!"
     * it() adalah function Jest untuk mendefinisikan satu test case
     * 
     * Test ini memverifikasi:
     * - Method getHello() bisa dipanggil
     * - Return value sesuai dengan yang diharapkan
     * - Integration antara controller dan service berjalan dengan benar
     */
    it('should return "Hello World!"', () => {
      // Memanggil method yang akan ditest
      // expect() untuk memverifikasi hasil
      // toBe() untuk membandingkan nilai exact
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  
  // TODO: Bisa ditambahkan test cases lain jika AppController memiliki method lain
  // Contoh test yang bisa ditambahkan:
  // - Test untuk endpoint health check
  // - Test untuk endpoint dengan parameter
  // - Test error handling
});
