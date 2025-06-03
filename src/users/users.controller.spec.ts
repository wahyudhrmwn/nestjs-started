// Import utilities untuk testing dari NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import class yang akan ditest
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * Test suite untuk UsersController
 * describe() adalah function dari Jest untuk mengelompokkan test cases
 * Test ini memastikan bahwa controller bisa dibuat dengan benar
 */
describe('UsersController', () => {
  // Deklarasi variabel untuk menyimpan instance controller yang akan ditest
  let controller: UsersController;

  /**
   * beforeEach() dijalankan sebelum setiap test case
   * Berfungsi untuk setup/persiapan yang diperlukan untuk testing
   */
  beforeEach(async () => {
    // Membuat testing module menggunakan Test.createTestingModule()
    // Ini mirip dengan module biasa tapi khusus untuk testing
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController], // Controller yang akan ditest
      providers: [UsersService],      // Dependencies yang dibutuhkan controller
    }).compile(); // compile() untuk build module testing

    // Mengambil instance UsersController dari testing module
    controller = module.get<UsersController>(UsersController);
  });

  /**
   * Test case pertama: memastikan controller bisa dibuat
   * it() adalah function Jest untuk mendefinisikan satu test case
   * expect().toBeDefined() memastikan bahwa variable tidak undefined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  // TODO: Tambahkan test cases lain untuk testing method-method di controller
  // Contoh test yang bisa ditambahkan:
  // - Test create() method dengan valid data
  // - Test create() method dengan invalid data
  // - Test findAll() method
  // - Test findOne() method dengan valid ID
  // - Test findOne() method dengan invalid ID
  // - Test update() method
  // - Test remove() method
});
