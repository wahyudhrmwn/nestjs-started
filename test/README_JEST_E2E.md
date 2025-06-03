# Dokumentasi Jest E2E Configuration

## 📄 Penjelasan File `jest-e2e.json`

File `jest-e2e.json` adalah konfigurasi khusus untuk menjalankan **End-to-End (E2E) Tests** menggunakan Jest. File ini terpisah dari konfigurasi Jest utama karena E2E testing memiliki kebutuhan yang berbeda.

## 🔧 Penjelasan Setiap Konfigurasi

### `moduleFileExtensions`
```json
"moduleFileExtensions": ["js", "json", "ts"]
```
**Fungsi:** Array ekstensi file yang akan diproses oleh Jest
- Jest akan mengenali file dengan ekstensi `.js`, `.json`, dan `.ts` sebagai module yang bisa di-import
- Penting untuk TypeScript support dalam testing

### `rootDir`
```json
"rootDir": "."
```
**Fungsi:** Directory root untuk mencari test files
- `"."` berarti current directory (folder `test/`)
- Jest akan mencari file test mulai dari directory ini

### `testEnvironment`
```json
"testEnvironment": "node"
```
**Fungsi:** Environment yang akan digunakan untuk menjalankan tests
- `"node"` cocok untuk E2E testing karena kita menguji aplikasi backend/server
- Alternative: `"jsdom"` untuk testing yang membutuhkan browser environment

### `testRegex`
```json
"testRegex": ".e2e-spec.ts$"
```
**Fungsi:** Pattern regex untuk mencari file test
- `.e2e-spec.ts$` berarti file yang berakhiran `.e2e-spec.ts`
- `$` menandakan akhir string (exact match)

**Contoh file yang akan dideteksi:**
- ✅ `app.e2e-spec.ts`
- ✅ `users.e2e-spec.ts`
- ✅ `auth.e2e-spec.ts`
- ❌ `app.spec.ts` (bukan E2E test)

### `transform`
```json
"transform": {
  "^.+\\.(t|j)s$": "ts-jest"
}
```
**Fungsi:** Konfigurasi untuk mentransform file sebelum dijalankan
- TypeScript files (`.ts` dan `.js`) akan ditransform menggunakan `ts-jest`
- `ts-jest` mengcompile TypeScript ke JavaScript agar bisa dijalankan Jest

## 🔄 Cara Menjalankan E2E Tests

```bash
# Menjalankan E2E tests
npm run test:e2e

# Menjalankan dengan watch mode
npm run test:e2e -- --watch

# Menjalankan dengan coverage
npm run test:e2e -- --coverage
```

## ⚙️ Konfigurasi Tambahan (Optional)

Beberapa konfigurasi yang bisa ditambahkan jika diperlukan:

### Setup Files
```json
"setupFilesAfterEnv": ["<rootDir>/test-setup.ts"]
```
- File setup yang dijalankan sebelum setiap test
- Berguna untuk setup database, mocking, dll

### Test Timeout
```json
"testTimeout": 30000
```
- Timeout untuk setiap test case (default 5000ms)
- E2E test biasanya lebih lama dari unit test

### Coverage Collection
```json
"collectCoverageFrom": ["src/**/*.ts"],
"coverageDirectory": "coverage-e2e"
```
- File mana saja yang diukur code coverage-nya
- Folder untuk menyimpan laporan code coverage

## 🆚 Perbedaan dengan Unit Test Configuration

| Aspek | Unit Test | E2E Test |
|-------|-----------|----------|
| **File Pattern** | `.spec.ts` | `.e2e-spec.ts` |
| **Scope** | Individual components | Entire application |
| **Dependencies** | Mock dependencies | Real dependencies |
| **Database** | Mock/In-memory | Real database |
| **Speed** | Fast | Slower |
| **Setup** | Minimal | Full application |

## 📋 Best Practices E2E Testing

1. **Gunakan test database terpisah** untuk menghindari konflik dengan development data
2. **Setup dan cleanup data** sebelum dan setelah test
3. **Test happy path** dan error scenarios
4. **Jangan terlalu banyak E2E test** karena lambat - fokus pada critical user flows
5. **Gunakan meaningful test data** yang mencerminkan real-world scenarios

## 🔍 Contoh Struktur E2E Test

```typescript
describe('Users API (e2e)', () => {
  beforeAll(async () => {
    // Setup test database, aplikasi, dll
  });

  beforeEach(async () => {
    // Bersihkan data sebelum setiap test
  });

  it('/users (POST) - should create user', () => {
    // Test create user endpoint
  });

  it('/users (GET) - should get all users', () => {
    // Test get users endpoint
  });

  afterAll(async () => {
    // Cleanup setelah semua test selesai
  });
});
``` 