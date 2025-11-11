/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
 console.log('\n--- Tambah Siswa Baru ---');
  const id = readlineSync.question('Masukkan ID siswa: ');
  const name = readlineSync.question('Masukkan nama siswa: ');
  const studentClass = readlineSync.question('Masukkan kelas siswa: ');

  if (!id || !name || !studentClass) {
    console.log('ID, nama, dan kelas harus diisi!');
    return;
  }

  const student = new Student(id, name, studentClass);
  const success = manager.addStudent(student);

  if (success) {
    console.log('Siswa berhasil ditambahkan!');
  } else {
    console.log('Gagal menambahkan siswa. ID mungkin sudah digunakan.');
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa yang dicari: ');
  const student = manager.findStudent(id);

  if (student) {
    console.log('\n--- Informasi Siswa ---');
    student.displayInfo();
  } else {
    console.log('Siswa tidak ditemukan!');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa yang akan diupdate: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData saat ini:');
  student.displayInfo();

  const newName = readlineSync.question(`\nMasukkan nama baru (kosongkan jika tidak ingin diubah, saat ini: ${student.name}): `);
  const newClass = readlineSync.question(`Masukkan kelas baru (kosongkan jika tidak ingin diubah, saat ini: ${student.class}): `);

  const updateData = {};
  if (newName) updateData.name = newName;
  if (newClass) updateData.class = newClass;

  const success = manager.updateStudent(id, updateData);
  if (success) {
    console.log('Data siswa berhasil diupdate!');
  } else {
    console.log('Gagal mengupdate data siswa.');
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData siswa yang akan dihapus:');
  student.displayInfo();

  const confirm = readlineSync.question('\nApakah Anda yakin ingin menghapus siswa ini? (y/N): ');
  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    const success = manager.removeStudent(id);
    if (success) {
      console.log('Siswa berhasil dihapus!');
    } else {
      console.log('Gagal menghapus siswa.');
    }
  } else {
    console.log('Penghapusan siswa dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa: ');
  const student = manager.findStudent(id);

  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }

  console.log('\nData siswa:');
  student.displayInfo();

  const subject = readlineSync.question('\nMasukkan mata pelajaran: ');
  const score = parseFloat(readlineSync.question('Masukkan nilai (0-100): '));

  if (isNaN(score) || score < 0 || score > 100) {
    console.log('Nilai harus berupa angka antara 0-100!');
    return;
  }

  try {
    student.addGrade(subject, score);
    console.log(`Nilai ${subject}: ${score} berhasil ditambahkan untuk ${student.name}!`);
  } catch (error) {
    console.log(`Gagal menambahkan nilai: ${error.message}`);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');
  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('Belum ada siswa terdaftar.');
    return;
  }

  topStudents.forEach((student, index) => {
    console.log(`\n--- Peringkat ${index + 1} ---`);
    student.displayInfo();
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  // TODO: Implementasikan loop utama program
 let running = true;
  
  while (running) {
    // Tampilkan menu
    displayMenu();
    // Baca pilihan user
    const choice = readlineSync.question('Pilih menu (1-8): ');
    // Jalankan action sesuai pilihan
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('Pilihan tidak valid! Silakan pilih menu 1-8.');
    }
    // TODO: Lengkapi implementasi
    if (running && choice !== '8') {
      readlineSync.question('\nTekan Enter untuk melanjutkan...');
    }
  }
  
  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
