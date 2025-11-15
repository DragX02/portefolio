<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';
require_once 'config/config.php';

$nom = $prenom = $email = $pass = $NomCompte = '';
$erreurs = [];
$success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = trim($_POST["nom"] ?? '');
    $prenom = trim($_POST["prenom"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $pass = trim($_POST["pass"] ?? '');
    $NomCompte = trim($_POST["NomCompte"] ?? '');
    
    // Validation du nom
    if (empty($nom)) {
        $erreurs[] = "Le nom est obligatoire.";
    } elseif (strlen($nom) < 2 || strlen($nom) > 255) {
        $erreurs[] = "Le nom doit contenir entre 2 et 255 caractères.";
    }
    
    // Validation du prénom
    if (!empty($prenom) && (strlen($prenom) < 2 || strlen($prenom) > 255)) {
        $erreurs[] = "Le prénom doit contenir entre 2 et 255 caractères.";
    }
    
    // Validation de l'email
    if (empty($email)) {
        $erreurs[] = "L'email est obligatoire.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erreurs[] = "L'email n'est pas valide.";
    }
    
    // Validation du mot de passe
    if (empty($pass)) {
        $erreurs[] = "Le mot de passe est obligatoire.";
    } elseif (strlen($pass) < 6) {
        $erreurs[] = "Le mot de passe doit contenir au moins 6 caractères.";
    }
    
    // Validation du nom de compte
    if (empty($NomCompte)) {
        $erreurs[] = "Le nom du compte est obligatoire.";
    } elseif (strlen($NomCompte) < 3 || strlen($NomCompte) > 50) {
        $erreurs[] = "Le nom du compte doit contenir entre 3 et 50 caractères.";
    }
    
    // Si pas d'erreurs, insertion en base de données
    if (empty($erreurs)) {
        try {
            // Hashage du mot de passe
            $hash_mdp = password_hash($pass, PASSWORD_DEFAULT);
            
            // Requête d'insertion
            $requete = "INSERT INTO User(nom, prenom, mail, mot_de_passe, nom_de_compte) VALUES(?, ?, ?, ?, ?)";
            $statement = $db->prepare($requete);
            $statement->execute([$nom, $prenom, $email, $hash_mdp, $NomCompte]);
            
            $success = true;
        } catch (PDOException $e) {
            $erreurs[] = "Désolé, une erreur est survenue lors de l'inscription : " . $e->getMessage();
        }
    }
}
?>
    <div class="formbody">
        <h1>Formulaire d'inscription</h1>
        <?php if ($success): ?>
            <p class="success">
                Merci pour votre inscription, 
                <?php echo htmlspecialchars($prenom) ? htmlspecialchars($prenom) . ' ' : ''; ?>
                <?php echo htmlspecialchars($nom); ?> ! 
                Votre compte a été créé avec succès.
            </p>
            <p><a href="connexion.php">Se connecter maintenant</a></p>
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
                    <label for="nom">Nom * :</label>
                    <input type="text" id="nom" name="nom" value="<?php echo htmlspecialchars($nom); ?>" required minlength="2" maxlength="255">
                </div>
                <div class="form-group">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" name="prenom" value="<?php echo htmlspecialchars($prenom); ?>" minlength="2" maxlength="255">
                </div>
                <div class="form-group">
                    <label for="email">Email * :</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>
                </div>
                <div class="form-group">
                    <label for="NomCompte">Nom de compte * :</label>
                    <input type="text" id="NomCompte" name="NomCompte" value="<?php echo htmlspecialchars($NomCompte); ?>" required minlength="3" maxlength="50">
                </div>
                <div class="form-group">
                    <label for="pass">Mot de passe * :</label>
                    <input type="password" id="pass" name="pass" required minlength="6">
                </div>
                <button type="submit">Valider</button>
                <a href="User.php">
                <button type="button">connectez-vous</button>
                </a>
            </form>
        <?php endif; ?>
    </div>
<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php';
?>