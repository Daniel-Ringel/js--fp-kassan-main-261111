// Rena funktioner för kassan. Inga sidoeffekter här.

//   findProduct(products, id)            -> produkten
export const findProduct = (products, id) => {
    return products.find((product) => product.id === id);
}

//   lineTotal(line, products)            -> pris × antal
export const lineTotal = (line, products) => {
    const product = findProduct(products, line.productId);
    return product.price * line.quantity;
}

//   subtotal(lines, products)            -> summan av alla rader (reduce)
export const subTotal = (lines, products) => {
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    total += lineTotal(lines[i], products);
  }
  return total;
}

//   applyDiscount(amount, code, codes)   -> beloppet efter rabatt
export const applyDiscount = (amount, code, codes) => {
    const rate = codes[code] || 0;
    return amount * (1 - rate);

}

//   vatOf(amount, rate)                  -> momsen i ett belopp som redan innehåller moms
export const vatOf = (amount, rate) => amount - amount / (1 + rate);

export const formatLine = (line, products) => {
    const { name } = findProduct(products, line.productId);
    return `${name} x${line.quantity} ${lineTotal(line, products)}`;
}

//   formatReceipt(lines, products, code) -> kvittot som en sträng
export const formatReceipt = (lines, products, code, codes, vatRate) => {
  const total = subTotal(lines, products);
  const discounted = applyDiscount(total, code, codes);
  const rows = lines.map((line) => formatLine(line, products));

  return [...rows, `Totalt: ${discounted} kr varav moms ${vatOf(discounted, vatRate).toFixed(2)} kr`].join("\n");
};