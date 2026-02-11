<?php
session_start();
$bodyClass = 'index-page';
$metaDescription = "Challenges Codewars - Portfolio";
require_once __DIR__ . DIRECTORY_SEPARATOR . 'header.php';
?>

<body>
    <div class="challenge-container">
        <div class="challenge-box">
            <div class="controls">
                <label for="kata-selector">Changer de challenge :</label>
                <select id="kata-selector">
                    <option value="5277c8a221e209d3f6000b56">Valid Braces (6 kyu)</option>
                    <option value="54bf1c2cd5b56cc47f0007a1">Quicksort (4 kyu)</option>
                    <option value="526571a03802488b310003af">Deadfish Swim (6 kyu)</option>
                    <option value="514b92a657cdc65150000006">Multiples of 3 or 5 (6 kyu)</option>
                </select>
                <button id="translate-btn">Traduire en Français 🇫🇷</button>
            </div>

            <h3>Challenge : <span id="titre-exo">Chargement...</span></h3>
            <p><strong>Difficulté :</strong> <span id="difficulte">...</span></p>
            <div id="description-exo"></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="js/codewars.js"></script>  
</body>

<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'footer.php';
?>