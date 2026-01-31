// Suwandy - suwandyhuang93@gmail.com

// Nested for...loop
console.log("Segitiga siku sederhana");
for (let i = 0; i < 4; i++) {
  let row = "";
  for (let j = 0; j <= i; j++) {
    row += "*";
  }
  console.log(row);
}

console.log("=========================");

console.log("Piramid / Segitiga utuh");
for (let i = 0; i < 4; i++) {
  let row = "";

  for (let j=4; j > i; j--) {
    row += " ";
  }

  for (let j = 0; j <= (2*i); j++) {
    row += "*";
  }
  console.log(row);
}
