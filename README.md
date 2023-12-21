# Laranode Framework

Laranode est un mini framework Node.js basé sur le fonctionnement du framework Laravel (PHP). Il offre une architecture permettant la création d'applications web performantes.

## Sommaire

1. [Introduction](#introduction)
2. [Arborescence](#arborescence)
   - [app](#app)
   - [bootstrap](#bootstrap)
   - [config](#config)
   - [migrations](#migrations)
   - [routes](#routes)
   - [utils](#utils)
3. [Fonctionnalités Clés](#fonctionnalités-clés)
4. [Dépendances de Laranode](#dépendances-de-laranode)

## Introduction

Laranode est conçu pour tirer parti poser les bases de son projet Node.js, rendant les tâches basique plus rapide.

## Arborescence

```
laranode/
|-- app/
|----Controller/
|----Models/
|----Repository/
|----Validator/
|-- bootstrap/
|-- config/
|-- migrations/
|-- routes/
|-- utils/

```

## Arborescence de Laranode

### app/

Ce répertoire contient le code source de l'application. Il est organisé en sous-répertoires pour mieux structurer le code.

- **Controller/** : Les contrôleurs gèrent la logique de traitement des requêtes HTTP et orchestrent les actions de l'application.
- **Models/** : Les modèles représentent la structure des données de l'application et interagissent avec la base de données.
- **Repository/** : Les repositories sont responsables de l'accès aux données.
- **Validator/** : Les validateurs définissent les règles de validation pour les données.

### bootstrap/

Le répertoire `bootstrap` contient les fichiers nécessaires au démarrage de l'application. Il peut inclure des configurations et des initialisations spécifiques.

### config/

Le répertoire `config` contient les fichiers de configuration de l'application. Vous pouvez y trouver des paramètres de configuration pour divers composants de votre application.

### migrations/

Le répertoire `migrations` contient les fichiers de migration de base de données. Les migrations décrivent les changements à apporter à la base de données à mesure que l'application évolue.

### routes/

Le répertoire `routes` contient les définitions des routes de votre application. Ces fichiers spécifient comment l'application doit réagir aux différentes URL.

### utils/

Le répertoire `utils` peut contenir des utilitaires ou des fonctions réutilisables dans l'ensemble de l'application. C'est un endroit pratique pour stocker du code qui ne correspond pas directement à un modèle, un contrôleur ou une autre structure spécifique.

## Fonctionnalités Clés

L'utilisation de Laravel offre une architecture MVC, une gestion facile de la base de données, et une abondance de fonctionnalités pour simplifier le développement côté serveur.

## Dépendances de Laranode

Les dépendances de Laranode sont spécifiées dans le fichier `package.json`. Voici une liste des principales dépendances avec leurs rôles :

- **bcrypt** : Une bibliothèque de hachage de mots de passe utilisée pour sécuriser et comparer les mots de passe utilisateur.

- **dotenv** : Un module qui charge les variables d'environnement depuis un fichier `.env` dans l'application. Utile pour stocker des configurations sensibles.

- **http** : Un module fournissant des fonctionnalités liées au protocole HTTP. Il peut être utilisé pour créer un serveur HTTP dans l'application.

- **nodemon** : Un utilitaire qui surveille les changements dans les fichiers de l'application et redémarre automatiquement le serveur lorsqu'un changement est détecté. Très utile pendant le développement.

- **pg** : Le pilote Node.js pour PostgreSQL, utilisé pour interagir avec une base de données PostgreSQL depuis l'application.


Laranode reprend l'écosystème riche de Laravel avec la puissance de Node.js, offrant une solution complète pour les développeurs web modernes.