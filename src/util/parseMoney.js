const parseMoney = (value) => {
  if (typeof value === 'string') {
    return parseFloat(
      value
      .replace('.', '')
      .replace(',', '.')
      .replace('R$ ', '')
      .replace('R$', '')
    );
  }
}

module.exports = { parseMoney };
