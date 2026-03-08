<?php
// démarrage de la session
session_start();
// classe CSS appliquée au body et meta description de la page
$bodyClass = 'index-page';
$metaDescription = "description de la page actuelle...";
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';
?>

<main class="index-main">
    <div class="index-left">
        <!-- conteneur du carousel 3D, initialisé par carou.js -->
        <div id="carousel3d"></div>
    </div>

    <aside class="index-right">
        <div class="coming-box">
            <h3>Box à venir</h3>
            <p>Contenu futur / widgets</p>
        </div>
    </aside>
</main>

<script src="js/carou.js" defer></script>

<?php require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php'; ?>
