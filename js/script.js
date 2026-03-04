document.addEventListener('DOMContentLoaded', 
    function(
    ) 
    {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownMenu) {
        dropdown.addEventListener('mouseover', function() {
            dropdownMenu.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseout', function() {
            dropdownMenu.style.display = 'none';
        });
    }
});
