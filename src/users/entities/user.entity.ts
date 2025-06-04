import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entity User untuk merepresentasikan tabel users di database
 * @Entity() decorator memberitahu TypeORM bahwa ini adalah sebuah entity
 * Secara otomatis akan membuat tabel dengan nama 'user' (atau 'users' tergantung config)
 */
@Entity()
export class User {
  /**
   * Primary key untuk tabel user
   * @PrimaryGeneratedColumn() membuat kolom id yang:
   * - Otomatis menjadi primary key
   * - Auto increment (nilainya bertambah otomatis)
   * - Type integer
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Kolom untuk menyimpan nama user
   * @Column() membuat kolom biasa di database
   * Type: VARCHAR di database, string di TypeScript
   */
  @Column()
  name: string;

  /**
   * Kolom untuk menyimpan email user
   * @Column() membuat kolom biasa di database
   * Type: VARCHAR di database, string di TypeScript
   * Sebaiknya ditambahkan constraint UNIQUE untuk email
   */
  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  
}
