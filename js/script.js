// gestion du menu dropdown de la navigation au survol
document.addEventListener('DOMContentLoaded', 
    function(
    ) 
    {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownMenu) {
        // affichage du menu au survol
        dropdown.addEventListener('mouseover', function() {
            dropdownMenu.style.display = 'block';
        });
        
        // masquage du menu quand la souris quitte
        dropdown.addEventListener('mouseout', function() {
            dropdownMenu.style.display = 'none';
        });
    }
});
