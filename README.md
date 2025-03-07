# Crypta Mobile

![Logo Crypta](./assets/images/icon.png)

Crypta Mobile est une application mobile multiplateforme pour gérer et suivre des actifs en cryptomonnaie. Développée avec React Native et Expo, elle fournit des données en temps réel, le suivi des transactions et la gestion de portefeuille.

## Fonctionnalités

- **Suivi des cryptomonnaies en temps réel**: Surveillez les prix des cryptomonnaies en temps réel
- **Gestion de portefeuille**: Suivez tous vos actifs crypto en un seul endroit
- **Historique des transactions**: Visualisez votre historique d'achats et de ventes
- **Gestion des fonds**: Déposez et retirez des fonds en toute sécurité
- **Système de favoris**: Enregistrez vos cryptomonnaies préférées pour un accès rapide
- **Authentification utilisateur**: Système sécurisé de connexion et d'inscription
- **Gestion de profil**: Personnalisez vos informations de profil et votre photo

## Technologies utilisées

- **React Native**: Framework principal de développement mobile
- **Expo**: Chaîne d'outils et plateforme de développement
- **Firebase**: Backend, authentification et base de données en temps réel
- **Firestore**: Stockage de base de données NoSQL
- **NativeWind/TailwindCSS**: Stylisation
- **Expo Router**: Navigation et routage
- **Expo Secure Store**: Stockage sécurisé des données
- **ImageKit**: Gestion et stockage d'images
- **React Native Gifted Charts**: Visualisation de données
- **Expo Notifications**: Notifications push

## Premiers pas

### Prérequis

- Node.js (v14 ou ultérieur)
- npm ou Yarn
- Expo CLI
- Compte Firebase

### Installation

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/votrenomdutilisateur/Crypta-mobile.git
   cd Crypta-mobile
   ```

2. Installez les dépendances:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez Firebase:
   - Créez un projet Firebase
   - Configurez l'Authentification et Firestore
   - Mettez à jour la configuration Firebase dans `app.config.js`

4. Démarrez le serveur de développement:
   ```bash
   npx expo start
   ```

5. Exécutez sur un appareil ou émulateur:
   ```bash
   npx expo run:android
   # ou
   npx expo run:ios
   ```

## Structure du projet

