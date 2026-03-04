<?php
session_start();
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';
$Pseudo = $pdw = '';
$erreurs = [];
$success = false;
$remember = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Pseudo = trim($_POST["Pseudo"] ?? '');
    $pdw = trim($_POST["pdw"] ?? '');
    $remember = isset($_POST["remember"]) ? true : false;
    
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
        require_once 'config/config.php';
        try {
            $requete = "SELECT * FROM User WHERE nom_de_compte = ?";
            $statement = $pdo->prepare($requete);
            $statement->execute([$Pseudo]);
            $user = $statement->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($pdw, $user['pwd'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_nom_de_compte'] = $user['nom_de_compte'];
                $_SESSION['user_nom'] = $user['nom'];
                $_SESSION['user_prenom'] = $user['prenom'];
                $_SESSION['user_mail'] = $user['mail'];
                
                if ($remember) {
                    $token = bin2hex(random_bytes(32));
                    $token_hash = password_hash($token, PASSWORD_DEFAULT);
                    $expiration = time() + (30 * 24 * 60 * 60);
                    
                    $_SESSION['remember_token'] = $token;
                    $_SESSION['remember_token_hash'] = $token_hash;
                    $_SESSION['remember_expiration'] = $expiration;
                    
                    setcookie('remember_me', $token . '|' . $user['id'], $expiration, '/', '', false, true);
                }
                
                header('Location: profil.php');
                exit;
            } else {
                $erreurs[] = "Nom de compte ou mot de passe incorrect.";
            }
        } catch (PDOException $e) {
            $erreurs[] = "Erreur de base de données : " . $e->getMessage();
        }
    }
}

ob_start();
?>
    <div class="formbody">
        <h1>Formulaire de connexion</h1>
        

        <?php if ($success): ?>
            <p class="success">Connexion réussie ! Redirection...</p>
            <script>
                setTimeout(function() {
                    window.location.href = 'index.php';
                }, 2000);
            </script>
        

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
                <div class="form-group">
                    <label for="remember">
                        <input type="checkbox" id="remember" name="remember" />
                        Se souvenir de moi (30 jours)
                    </label>
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