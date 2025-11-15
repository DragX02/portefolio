<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';
$Pseudo = $pdw = '';
$erreurs = [];
$success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Pseudo = trim($_POST["Pseudo"] ?? '');
    $pdw = trim($_POST["pdw"] ?? '');
    
    if (empty($Pseudo)) {
        $erreurs[] = "Le pseudo est obligatoire.";
    } elseif (strlen($Pseudo) < 2 || strlen($Pseudo) > 255) {
        $erreurs[] = "Le pseudo doit contenir entre 2 et 255 caractères.";
    }
    
    if (empty($pdw)) {
        $erreurs[] = "Le mot de passe est obligatoire.";
    } elseif (strlen($pdw) < 6) {
        $erreurs[] = "Le mot de passe doit contenir au moins 6 caractères.";
    }
    
    if (empty($erreurs)) {
        $success = true;
        // Ici, ajoutez votre logique de connexion (vérification base de données, etc.)
    }
}

ob_start();
?>
    <div class="formbody">
        <h1>Formulaire de connexion</h1>
        <?php if ($success): ?>
            <p class="success">Merci pour votre connexion, <?php echo htmlspecialchars($Pseudo); ?> !</p>
        <?php else: ?>
            <?php if (!empty($erreurs) && $_SERVER["REQUEST_METHOD"] == "POST"): ?>
                <ul class="error">
                    <?php foreach ($erreurs as $erreur): ?>
                        <li><?php echo htmlspecialchars($erreur); ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <form method="post">
                <div class="form-group">
                    <label for="Pseudo">Nom de compte * :</label>
                    <input type="text" id="Pseudo" name="Pseudo" value="<?php echo htmlspecialchars($Pseudo); ?>" />
                </div>
                <div class="form-group">
                    <label for="pdw">Mot de passe * :</label>
                    <input type="password" id="pdw" name="pdw" />
                </div>
                <button type="submit">Connexion</button>
                <a href="Inscription.php">
                <button type="button">Inscrivez-vous</button>
                </a>
            </form>
            
        <?php endif; ?>
    </div>
<?php
$contact = ob_get_clean();
echo $contact;
require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php';
?>