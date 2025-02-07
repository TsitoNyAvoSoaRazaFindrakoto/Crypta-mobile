# Crypta SDK

SDK pour le suivi et la gestion des cryptomonnaies en temps réel.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- React Native (version 0.71 ou supérieure)
- Expo (version 49 ou supérieure)

## Technologies Utilisées

- **React Native**: Framework pour le développement mobile
- **Expo**: Plateforme de développement React Native
- **TypeScript**: Langage de programmation typé
- **TailwindCSS**: Framework CSS pour le style
- **React Native Charts**: Pour l'affichage des graphiques
- **Firebase**: Pour l'authentification et le stockage de données

## Installation

```bash
npm install @crypta/sdk
# ou
yarn add @crypta/sdk
```

## Configuration

### 1. Configuration de l'Environnement

```bash
# Installation des dépendances globales
npm install -g expo-cli
npm install -g typescript

# Installation des dépendances du projet
npm install
```

### 2. Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
API_URL=votre_url_api
API_KEY=votre_cle_api
FIREBASE_CONFIG={...vos_configurations_firebase}
```

## Utilisation du SDK

### 1. Initialisation

```typescript
import { CryptaSDK } from '@crypta/sdk';

const sdk = new CryptaSDK({
  apiKey: process.env.API_KEY,
  baseUrl: process.env.API_URL
});
```

### 2. Fonctionnalités Principales

#### Gestion des Cryptomonnaies

```typescript
// Récupérer la liste des cryptomonnaies
const cryptos = await sdk.getCryptoAssets();

// Obtenir l'historique des prix
const historique = await sdk.getHistoricalData(1, 'week');

// Gérer les favoris
await sdk.toggleFavorite(1);

// Calculer les variations de prix
const variation = sdk.calculatePriceChange(10000, 9000);
```

## Structure du Projet

```
crypta-mobile/
├── app/                    # Code source principal
│   ├── home/              # Pages principales
│   │   └── crypto/        # Composants crypto
├── assets/                # Ressources statiques
├── components/            # Composants réutilisables
├── constants/             # Constants et configurations
├── firebase/             # Configuration Firebase
├── hooks/                # Hooks personnalisés
├── sdk/                  # SDK Crypta
│   ├── types.ts          # Types et interfaces
│   ├── index.ts          # Classe principale du SDK
│   └── README.md         # Documentation
└── package.json          # Dépendances
```

## Composants Principaux

### CryptoRow
Composant pour afficher les informations d'une cryptomonnaie :
- Prix actuel
- Variation de prix
- Statut favori
- Icône personnalisée

### CustomChart
Composant de graphique personnalisé pour afficher :
- Historique des prix
- Tendances
- Périodes personnalisables

## Sécurité

- Authentification via Firebase
- Stockage sécurisé des clés API
- Chiffrement des données sensibles
- Validation des entrées utilisateur

## Bonnes Pratiques

1. **Code**
   - Utiliser TypeScript pour le typage
   - Suivre les principes SOLID
   - Documenter les fonctions et composants

2. **Performance**
   - Optimiser les rendus React
   - Mettre en cache les données
   - Utiliser la pagination pour les listes

3. **UI/UX**
   - Interface responsive
   - Thème sombre/clair
   - Animations fluides
   - Retours utilisateur

## Dépannage

### Problèmes Courants

1. **Erreur de connexion API**
   ```
   Solution: Vérifier les configurations dans .env
   ```

2. **Graphiques ne s'affichent pas**
   ```
   Solution: Vérifier l'installation de react-native-charts
   ```

3. **Problèmes de compilation**
   ```
   Solution: Nettoyer le cache
   npx expo start -c
   ```

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation API
- Contacter l'équipe de support

## Types de Données

```typescript
interface CryptoAsset {
  id: number;
  name: string;
  price: number;
  previousPrice?: number;
  favorite: boolean;
}

interface ChartData {
  value: number;
  label?: string;
  timestamp: number;
}

interface CryptoSDKConfig {
  apiKey?: string;
  baseUrl?: string;
}
