export function formatPrice(amount: number | null | undefined): string {
  if (amount == null) return 'N/A';
  
  // Le montant est déjà en FCFA, pas besoin de conversion
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
