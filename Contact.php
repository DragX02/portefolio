<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';

// Initialisation des variables
$nom = $prenom = $email = $message = '';
$erreurs = [];
$success = false;

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = trim(htmlspecialchars($_POST["nom"] ?? ''));
    $prenom = trim(htmlspecialchars($_POST["prenom"] ?? ''));
    $email = trim(htmlspecialchars($_POST["email"] ?? ''));
    $message = trim(htmlspecialchars($_POST["message"] ?? ''));

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

    // Validation du message
    if (empty($message)) {
        $erreurs[] = "Le message est obligatoire.";
    } elseif (strlen($message) < 10 || strlen($message) > 3000) {
        $erreurs[] = "Le message doit contenir entre 10 et 3000 caractères.";
    }

    // Si pas d'erreurs, succès
    if (empty($erreurs)) {
        $success = true;
        // Ici, tu peux ajouter l'envoi d'email ou l'enregistrement en base de données
    }
}

ob_start();
?>
    <div class="formbody">
        <h1>Formulaire de contact</h1>

        <?php if ($success): ?>
            <p class="success">Merci pour votre message, <?php echo $prenom ? $prenom . ' ' : ''; ?><?php echo $nom; ?> ! Nous vous contacterons à l'adresse <?php echo $email; ?>.</p>
        <?php else: ?>
            <?php if (!empty($erreurs) && $_SERVER["REQUEST_METHOD"] == "POST"): ?>
                <ul class="error">
                    <?php foreach ($erreurs as $erreur): ?>
                        <li><?php echo $erreur; ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <form method="post">
                <div class="form-group">
                    <label for="nom">Nom *:</label>
                    <input type="text" id="nom" name="nom" value="<?php echo $nom; ?>" required minlength="2" maxlength="255">
                </div>
                <div class="form-group">
                    <label for="prenom">Prénom :</label>
                    <input type="text" id="prenom" name="prenom" value="<?php echo $prenom; ?>" minlength="2" maxlength="255">
                </div>
                <div class="form-group">
                    <label for="email">Email *:</label>
                    <input type="email" id="email" name="email" value="<?php echo $email; ?>" required>
                </div>
                <div class="form-group">
                    <label for="message">Message *:</label>
                    <textarea id="message" name="message" required minlength="10" maxlength="3000"><?php echo $message; ?></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        <?php endif; ?>
                    </div>
<?php
$contact = ob_get_clean();
echo $contact;
require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php';
?>
