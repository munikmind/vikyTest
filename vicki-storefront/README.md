# Vicki Storefront

Ce projet est une boutique en ligne construite avec Next.js et Medusa.

## Fonctionnalités

- Affichage des produits
- Recherche et filtrage des produits
- Panier d'achat
- Processus de checkout complet
- Gestion des commandes

## Processus de checkout

Le processus de checkout est implémenté en suivant les étapes recommandées par Medusa :

1. **Panier** - Affichage des articles du panier avec possibilité de modifier les quantités ou supprimer des articles.
2. **Email** - Collecte de l'adresse email du client.
3. **Adresse** - Collecte des informations d'adresse de livraison.
4. **Expédition** - Sélection de la méthode d'expédition.
5. **Paiement** - Sélection de la méthode de paiement et finalisation de la commande.
6. **Confirmation** - Affichage d'une page de confirmation avec les détails de la commande.

Le processus utilise l'API Medusa pour gérer les collections de paiement et les sessions de paiement.

## Technologies utilisées

- Next.js
- React
- TypeScript
- Tailwind CSS
- Medusa Commerce
- React Query

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Licence

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
