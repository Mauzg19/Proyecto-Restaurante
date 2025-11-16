// Devuelve una cadena de precio con símbolo $ y separador de miles con punto.
// Ejemplo: 23700 -> "$23.700"
export default function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '';
  // Si viene como string que contiene comas o puntos, intentar parsear a número
  const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]+/g, ''));
  if (Number.isNaN(num)) return String(value);
  return `$${new Intl.NumberFormat('de-DE').format(num)}`;
}
