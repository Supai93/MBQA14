export function hitung(n1, n2, op) {
  if (op) {
    switch (op) {
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
      case "*":
        return n1 * n2;
      case "**":
        return n1 ** n2;
      case "/":
        return n2 != 0 ? n1 / n2 : 0;
      case "%":
        return n1 % n2;
      default:
        return "Operator tidak valid!";
    }
  } else {
    return "Operator tidak valid!";
  }
}
