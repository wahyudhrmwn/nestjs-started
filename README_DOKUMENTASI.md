# Dokumentasi NestJS User Management API

## 📋 Daftar Isi
1. [Penjelasan Arsitektur](#penjelasan-arsitektur)
2. [Struktur Project](#struktur-project)
3. [Penjelasan File per File](#penjelasan-file-per-file)
4. [API Endpoints](#api-endpoints)
5. [Cara Penggunaan](#cara-penggunaan)
6. [Testing](#testing)
7. [Konsep Penting untuk Pemula](#konsep-penting-untuk-pemula)

## 🏗️ Penjelasan Arsitektur

Project ini menggunakan arsitektur **Layered Architecture** yang umum digunakan di NestJS:

```
┌─────────────────┐
│   Controller    │ ← HTTP Layer (Routes, Request/Response)
├─────────────────┤
│    Service      │ ← Business Logic Layer
├─────────────────┤
│   Repository    │ ← Data Access Layer (Database)
└─────────────────┘
```

### Alur Kerja Request:
1. **Client** mengirim HTTP request
2. **Controller** menerima request dan memanggil service
3. **Service** memproses business logic dan memanggil repository
4. **Repository** berinteraksi dengan database
5. **Response** dikembalikan melalui layers yang sama

## 📁 Struktur Project

```
src/
├── common/                     # Kode yang digunakan di seluruh aplikasi
│   ├── filters/               # Exception filters
│   │   └── http-exception.filter.ts
│   ├── interfaces/            # Interface/Type definitions
│   │   └── api-response.interface.ts
│   └── utils/                 # Utility functions
│       └── response.util.ts
├── users/                     # Module User
│   ├── dto/                   # Data Transfer Objects
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/              # Database entities
│   │   └── user.entity.ts
│   ├── users.controller.ts    # HTTP endpoints
│   ├── users.service.ts       # Business logic
│   ├── users.module.ts        # Module configuration
│   └── *.spec.ts             # Test files
├── app.controller.ts          # Root controller
├── app.service.ts             # Root service
├── app.module.ts              # Root module
└── main.ts                    # Application entry point
test/
├── app.e2e-spec.ts           # End-to-end tests
├── jest-e2e.json             # Jest E2E configuration
└── README_JEST_E2E.md        # Jest E2E documentation
```

## 📄 Penjelasan File per File

### 1. Root Application Files

#### `main.ts`
```typescript
// Entry point aplikasi - bootstrap dan start server
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
```

#### `app.module.ts`
```typescript
// Root module - konfigurasi database, imports, dan global providers
@Module({
  imports: [TypeOrmModule.forRoot({...}), UsersModule],
  providers: [AppService, GlobalExceptionFilter]
})
```

#### `app.controller.ts` & `app.service.ts`
```typescript
// Root controller dan service untuk endpoint dasar (health check, dll)
@Get() getHello(): string // Endpoint untuk cek aplikasi berjalan
```

### 2. Common Layer

#### `api-response.interface.ts`
```typescript
// Mendefinisikan struktur response API yang konsisten
export interface ApiResponse<T = any> {
  status: number;    // HTTP status code
  message: string;   // Pesan response
  data?: T;         // Data (optional)
  error?: any;      // Error info (optional)
}
```

#### `response.util.ts`
```typescript
// Utility untuk membuat response yang konsisten
ResponseUtil.success(data, message)     // Response sukses dengan data
ResponseUtil.error(message, status)     // Response error
ResponseUtil.created(data)              // Response 201 Created
ResponseUtil.notFound(message)          // Response 404 Not Found
```

#### `http-exception.filter.ts`
```typescript
// Filter global untuk menangani semua exception
// Mengubah exception menjadi response JSON yang konsisten
```

### 3. Users Module

#### `user.entity.ts`
```typescript
// Representasi tabel database
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;        // Primary key, auto increment
  
  @Column()
  name: string;      // Kolom nama
  
  @Column()
  email: string;     // Kolom email
}
```

#### `create-user.dto.ts` & `update-user.dto.ts`
```typescript
// DTO = Data Transfer Object
// Mendefinisikan struktur data yang diterima dari client
// Digunakan untuk validasi input
```

#### `users.service.ts`
```typescript
// Business logic layer
// Method utama:
create(createUserDto)     // Membuat user baru
findAll()                 // Mengambil semua user
findOne(id)              // Mencari user by ID
update(id, updateUserDto) // Update user
remove(id)               // Hapus user
```

#### `users.controller.ts`
```typescript
// HTTP endpoints layer
// Route endpoints:
POST   /users           // Buat user baru
GET    /users           // Ambil semua user
GET    /users/:id       // Ambil user by ID
PATCH  /users/:id       // Update user
DELETE /users/:id       // Hapus user
```

#### `users.module.ts`
```typescript
// Konfigurasi module
// Menghubungkan controller, service, dan database repository
```

## 🔌 API Endpoints

### 1. Root Endpoint
```http
GET /
```
**Response:** `"Hello World!"` (Health check)

### 2. Membuat User Baru
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Mengambil Semua User
```http
GET /users
```

### 4. Mengambil User by ID
```http
GET /users/1
```

### 5. Update User
```http
PATCH /users/1
Content-Type: application/json

{
  "name": "John Updated"
}
```

### 6. Hapus User
```http
DELETE /users/1
```

## 🚀 Cara Penggunaan

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
- Konfigurasi database di `src/app.module.ts`
- Pastikan PostgreSQL sudah berjalan
- Buat database dengan nama `nestjs_db`

### 3. Jalankan Aplikasi
```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Watch mode
npm run start
```

### 4. Testing API
Gunakan tools seperti:
- **Postman** untuk testing manual
- **Thunder Client** (VS Code extension)
- **curl** command line

## 🧪 Testing

### Unit Tests
```bash
# Menjalankan unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

### End-to-End Tests
```bash
# Menjalankan E2E tests
npm run test:e2e
```

### File Testing yang Tersedia:
- `src/**/*.spec.ts` - Unit tests untuk setiap component
- `test/app.e2e-spec.ts` - End-to-end tests
- `test/jest-e2e.json` - Konfigurasi Jest untuk E2E
- `test/README_JEST_E2E.md` - Dokumentasi Jest E2E

## 🧠 Konsep Penting untuk Pemula

### 1. **Dependency Injection**
```typescript
constructor(private readonly usersService: UsersService) {}
// NestJS otomatis menyediakan instance UsersService
```

### 2. **Decorators**
```typescript
@Controller('users')  // Membuat route base '/users'
@Get()               // HTTP GET method
@Post()              // HTTP POST method  
@Injectable()        // Class bisa di-inject
@Entity()            // Database entity
```

### 3. **Async/Await**
```typescript
async create(dto: CreateUserDto): Promise<User> {
  // Operasi database selalu async
  return await this.repository.save(user);
}
```

### 4. **Exception Handling**
```typescript
if (!user) {
  throw new NotFoundException('User not found');
}
// Exception otomatis ditangani oleh filter
```

### 5. **TypeScript Generics**
```typescript
ApiResponse<User>     // Response berisi data User
ApiResponse<User[]>   // Response berisi array User
```

### 6. **DTO Pattern**
- **Purpose**: Validasi dan struktur data input
- **CreateUserDto**: Data untuk membuat user baru
- **UpdateUserDto**: Data untuk update (semua field optional)

### 7. **Repository Pattern**
```typescript
// Abstraksi untuk database operations
this.userRepository.save(user)     // Insert/Update
this.userRepository.find()         // Select all
this.userRepository.findOne()      // Select by condition
this.userRepository.delete(id)     // Delete
```

### 8. **Module System**
```typescript
// Setiap feature punya module sendiri
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
```

## 🔍 Tips untuk Pemula

1. **Baca error message dengan teliti** - NestJS memberikan error yang sangat deskriptif
2. **Gunakan TypeScript** - Type safety membantu mencegah bug
3. **Ikuti convention** - Gunakan naming yang konsisten
4. **Test secara bertahap** - Test setiap endpoint setelah dibuat
5. **Gunakan VS Code extensions** seperti Thunder Client untuk testing API
6. **Pelajari HTTP status codes** - 200 (OK), 201 (Created), 404 (Not Found), dll
7. **Pahami lifecycle** - Module → Controller → Service → Repository
8. **Gunakan exception filters** untuk handling error yang konsisten

## 📚 Sumber Belajar Lebih Lanjut

1. [NestJS Official Documentation](https://nestjs.com/)
2. [TypeORM Documentation](https://typeorm.io/)
3. [TypeScript Handbook](https://www.typescriptlang.org/docs/)
4. [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
5. [Jest Testing Framework](https://jestjs.io/)

## 🎯 Next Steps

Setelah memahami project ini, Anda bisa:
1. **Menambah validasi** pada DTO menggunakan `class-validator`
2. **Implementasi authentication** dengan JWT
3. **Menambah relasi database** antar entities
4. **Implementasi pagination** untuk endpoint GET
5. **Menambah logging** untuk monitoring
6. **Setup CI/CD** untuk deployment otomatis

---

**Selamat belajar! 🎉**

> File ini dibuat untuk membantu pemula memahami struktur dan cara kerja aplikasi NestJS. Setiap file sudah diberi komentar penjelasan yang detail. Jika ada pertanyaan, jangan ragu untuk bertanya atau membaca dokumentasi resmi. 