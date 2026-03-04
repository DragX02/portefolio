<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo isset($metaDescription) ? htmlspecialchars($metaDescription) : 'Mon Premier Modèle de Page Dynamique'; ?>">
    <title>portfolio Olbrechts johan</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/theme.css">
    <script src="js/script.js" defer></script>
    <script src="js/theme.js" defer></script>
</head>
<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'gestionAuthentification.php';
demarrer_session();

if (!est_connecte() && isset($_COOKIE['remember_me'])) {
    try {
        $cookie_parts = explode('|', $_COOKIE['remember_me']);
        if (count($cookie_parts) == 2) {
            $token = $cookie_parts[0];
            $user_id = intval($cookie_parts[1]);

            if (isset($_SESSION['remember_expiration']) && time() < $_SESSION['remember_expiration']) {
                require_once __DIR__ . DIRECTORY_SEPARATOR . 'config/config.php';
                $requete = "SELECT * FROM User WHERE id = ?";
                $statement = $pdo->prepare($requete);
                $statement->execute([$user_id]);
                $user = $statement->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    connecter_utilisateur($user);
                }
            }
        }
    } catch (Exception $e) {
    }
}

// Detection de la page courante pour la classe active
$pageCourante = basename($_SERVER['PHP_SELF']);
?>
<body<?php echo isset($bodyClass) ? ' class="'.htmlspecialchars($bodyClass).'"' : ''; ?>>
    <header class="background">
        <nav>
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link<?php echo ($pageCourante === 'index.php') ? ' active' : ''; ?>" href="index.php" aria-label="Accueil">
                    <img class="nav-icon" src="Image/logo/accueil.png" alt="Accueil">
                    <span class="nav-text">Accueil</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link<?php echo ($pageCourante === 'a-propos.php') ? ' active' : ''; ?>" href="a-propos.php" aria-label="À Propos">
                    <img class="nav-icon" src="Image/logo/About2.png" alt="À Propos">
                    <span class="nav-text">Code</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link<?php echo ($pageCourante === 'Contact.php' || $pageCourante === 'contact.php') ? ' active' : ''; ?>" href="Contact.php" aria-label="Contact">
                    <img class="nav-icon" src="Image/logo/contact.png" alt="Contact">
                    <span class="nav-text">Contact</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                <?php if (est_connecte()): ?>
                    <a class="nav-link btn-connected dropdown-toggle<?php echo ($pageCourante === 'profil.php') ? ' active' : ''; ?>" href="#" aria-label="Mon compte">
                        <img class="nav-icon" src="Image/logo/User.png" alt="Mon compte">
                        <span class="nav-text">Mon compte</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="profil.php">Mon profil</a></li>
                        <li><a href="logout.php">Déconnexion</a></li>
                    </ul>
                <?php else: ?>
                    <a class="nav-link btn-disconnected<?php echo ($pageCourante === 'User.php' || $pageCourante === 'Inscription.php') ? ' active' : ''; ?>" href="User.php" aria-label="Connexion">
                        <img class="nav-icon" src="Image/logo/User.png" alt="Connexion">
                        <span class="nav-text">Connexion</span>
                    </a>
                <?php endif; ?>
            </li>
            <li class="nav-item">
                <button id="theme-toggle" class="theme-toggle" aria-label="Basculer thème">☀️</button>
            </li>
        </ul>
        </nav>
    </header>