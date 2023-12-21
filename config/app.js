import dotenv from "dotenv";
dotenv.config();

/**
 * Configuration de l'application, incluant les paramètres de la base de données.
 */
export default {
    database: {
      user: process.env.DB_USER || 'votre_utilisateur',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'votre_base_de_donnees',
      password: process.env.DB_PASSWORD || 'votre_mot_de_passe',
      port: process.env.DB_PORT || 5432,
    },
};
  