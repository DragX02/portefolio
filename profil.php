<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: User.php');
    exit;
}

require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';

$nom_de_compte = $_SESSION['user_nom_de_compte'];
$nom = $_SESSION['user_nom'];
$prenom = $_SESSION['user_prenom'];
$mail = $_SESSION['user_mail'];

ob_start();
?>

<div class="formbody">
    <h1>Profil de l'utilisateur</h1>
    <div class="profile-info">
        <p><strong>Nom de compte :</strong> <?php echo htmlspecialchars($nom_de_compte); ?></p>
        <p><strong>Nom :</strong> <?php echo htmlspecialchars($nom); ?></p>
        <p><strong>Prénom :</strong> <?php echo htmlspecialchars($prenom); ?></p>
        <p><strong>Email :</strong> <?php echo htmlspecialchars($mail); ?></p>
    </div>
    <a href="logout.php"><button type="button">Déconnexion</button></a>
</div>

<?php
$content = ob_get_clean();
echo $content;
require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php';
?>
