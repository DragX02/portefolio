<?php

/**
 * Demarre la session avec une configuration securisee.
 */
function demarrer_session() {
    if (session_status() === PHP_SESSION_NONE) {
        ini_set('session.use_strict_mode', 1);
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'secure' => false, // mettre true en production avec HTTPS
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }
}

/**
 * Enregistre l'utilisateur dans la session apres connexion.
 */
function connecter_utilisateur($user) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_nom_de_compte'] = $user['nom_de_compte'];
    $_SESSION['user_nom'] = $user['nom'];
    $_SESSION['user_prenom'] = $user['prenom'];
    $_SESSION['user_mail'] = $user['mail'];
}

/**
 * Verifie si l'utilisateur est connecte.
 */
function est_connecte() {
    return isset($_SESSION['user_id']);
}

/**
 * Deconnecte l'utilisateur (detruit la session et supprime le cookie).
 */
function deconnecter_utilisateur() {
    $_SESSION = [];
    session_destroy();
    if (isset($_COOKIE['remember_me'])) {
        setcookie('remember_me', '', time() - 3600, '/');
    }
}

/**
 * Genere un token CSRF et le stocke en session.
 */
function generer_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verifie la validite d'un token CSRF.
 */
function verifier_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
