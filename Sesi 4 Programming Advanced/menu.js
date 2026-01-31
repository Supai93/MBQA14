import { hitung } from "./rumus.js";
import readline from "readline";

const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// operator tersedia:
// + tambah
// - kurang
// * kali
// ** pangkat
// / bagi
// % modulo (sisa pembagian)

inputUser.question("Masukkan angka pertama: ", (n1) => {
  inputUser.question("Masukkan angka kedua: ", (n2) => {
    inputUser.question("Pilih operator (+,-,*,**,/,%): ", (op) => {
      console.log(`Hasil: ${hitung(n1, n2, op)}`);
      inputUser.close();
    });
  });
});
