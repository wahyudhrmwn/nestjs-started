// Import utilities untuk testing dari NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import interface untuk NestJS application
import { INestApplication } from '@nestjs/common';
// Import supertest untuk HTTP testing
import * as request from 'supertest';
// Import type untuk supertest App
import { App } from 'supertest/types';
// Import root module aplikasi
import { AppModule } from './../src/app.module';

/**
 * End-to-End (E2E) Test untuk AppController
 * 
 * E2E test berbeda dengan unit test:
 * - Unit test: Test individual component (controller, service) secara terisolasi
 * - E2E test: Test seluruh aplikasi end-to-end melalui HTTP request
 * 
 * E2E test ini memverifikasi:
 * - Aplikasi bisa di-bootstrap dengan benar
 * - HTTP endpoints bisa diakses
 * - Response sesuai dengan yang diharapkan
 * - Integration antar semua komponen aplikasi
 */
describe('AppController (e2e)', () => {
  // Deklarasi variabel untuk aplikasi NestJS
  let app: INestApplication<App>;

  /**
   * beforeEach() dijalankan sebelum setiap test case
   * Setup untuk membuat aplikasi testing yang lengkap
   */
  beforeEach(async () => {
    /**
     * Membuat testing module dengan mengimpor AppModule lengkap
     * Berbeda dengan unit test yang hanya import komponen tertentu,
     * E2E test menggunakan seluruh aplikasi (termasuk database, middleware, dll)
     */
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import AppModule lengkap dengan semua dependencies
    }).compile();

    /**
     * Membuat aplikasi NestJS dari testing module
     * createNestApplication() membuat instance aplikasi yang sama
     * seperti yang digunakan di production
     */
    app = moduleFixture.createNestApplication();
    
    /**
     * Inisialisasi aplikasi
     * app.init() menjalankan lifecycle hooks dan setup aplikasi
     * Seperti menjalankan bootstrap() tapi untuk testing
     */
    await app.init();
  });

  /**
   * Test case: GET request ke endpoint root (/)
   * 
   * Test ini memverifikasi:
   * - HTTP GET request ke / berhasil
   * - Status code adalah 200 (OK)
   * - Response body adalah "Hello World!"
   */
  it('/ (GET)', () => {
    /**
     * Menggunakan supertest untuk melakukan HTTP request
     * request(app.getHttpServer()) membuat HTTP client untuk testing
     * 
     * Alur test:
     * 1. GET request ke path '/'
     * 2. Expect status code 200
     * 3. Expect response body "Hello World!"
     */
    return request(app.getHttpServer())
      .get('/')                    // HTTP GET ke endpoint root
      .expect(200)                 // Expect status code 200 (OK)
      .expect('Hello World!');     // Expect response body exact match
  });
  
  // TODO: Tambahkan E2E test untuk endpoint lain
  // Contoh test yang bisa ditambahkan:
  // - Test GET /users (mengambil semua user)
  // - Test POST /users (membuat user baru)
  // - Test dengan authentication header
  // - Test error scenarios (404, 500, dll)
  // - Test dengan database integration
  
  /**
   * afterEach() atau afterAll() bisa ditambahkan untuk cleanup
   * Misalnya untuk menutup koneksi database atau membersihkan test data
   */
  afterAll(async () => {
    // Tutup aplikasi setelah semua test selesai
    await app.close();
  });
});
