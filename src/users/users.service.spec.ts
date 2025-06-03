// Import utilities untuk testing dari NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import service yang akan ditest
import { UsersService } from './users.service';

/**
 * Test suite untuk UsersService
 * describe() adalah function dari Jest untuk mengelompokkan test cases
 * Test ini memastikan bahwa service bisa dibuat dengan benar
 */
describe('UsersService', () => {
  // Deklarasi variabel untuk menyimpan instance service yang akan ditest
  let service: UsersService;

  /**
   * beforeEach() dijalankan sebelum setiap test case
   * Berfungsi untuk setup/persiapan yang diperlukan untuk testing
   */
  beforeEach(async () => {
    // Membuat testing module menggunakan Test.createTestingModule()
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService], // Service yang akan ditest
      // NOTE: Dalam test yang sesungguhnya, perlu mock repository
      // karena service ini membutuhkan database repository
    }).compile(); // compile() untuk build module testing

    // Mengambil instance UsersService dari testing module
    service = module.get<UsersService>(UsersService);
  });

  /**
   * Test case pertama: memastikan service bisa dibuat
   * it() adalah function Jest untuk mendefinisikan satu test case
   * expect().toBeDefined() memastikan bahwa variable tidak undefined
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  // TODO: Tambahkan test cases lain dengan mock repository
  // Untuk testing service yang menggunakan database, perlu:
  // 1. Mock Repository<User> menggunakan jest.createMockFromModule()
  // 2. Provide mock repository dalam testing module
  // 3. Test semua method service dengan berbagai skenario
  // 
  // Contoh test yang bisa ditambahkan:
  // - Test create() method berhasil
  // - Test findAll() method berhasil
  // - Test findOne() dengan ID valid
  // - Test findOne() dengan ID tidak ditemukan (should throw NotFoundException)
  // - Test update() method berhasil
  // - Test update() dengan ID tidak ditemukan
  // - Test remove() method berhasil
  // - Test remove() dengan ID tidak ditemukan
});
