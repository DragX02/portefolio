<?php
session_start();

// Détruire la session
session_destroy();

// Supprimer le cookie "Se souvenir de moi"
if (isset($_COOKIE['remember_me'])) {
    setcookie('remember_me', '', time() - 3600, '/');
}

// Rediriger vers la page de connexion
header('Location: User.php');
exit;
?>
