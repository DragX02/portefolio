<?php
// Copier ce fichier en config.php et remplir les valeurs
$nomDuServeur = 'localhost';
$nomUtilisateur = 'VOTRE_UTILISATEUR_MYSQL';
$motDePasse = 'VOTRE_MOT_DE_PASSE';

try {
    $dsn = "mysql:host=$nomDuServeur;charset=utf8mb4";

    $pdo = new PDO($dsn, $nomUtilisateur, $motDePasse);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS bdd_ifosup CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");

    $pdo->exec("USE bdd_ifosup;");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS User (
            id INT(11) AUTO_INCREMENT PRIMARY KEY UNIQUE,
            nom VARCHAR(100) NOT NULL,
            prenom VARCHAR(100) NOT NULL,
            mail VARCHAR(255) NOT NULL UNIQUE,
            nom_de_compte VARCHAR(50) NOT NULL UNIQUE,
            pwd VARCHAR(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    ");

} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
