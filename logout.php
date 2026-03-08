<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'gestionAuthentification.php';
demarrer_session();

deconnecter_utilisateur();

header('Location: User.php');
exit;
?>