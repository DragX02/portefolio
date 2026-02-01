# Portfolio Website - AI Coding Guidelines

## Architecture Overview
This is a PHP-based portfolio website with user authentication, featuring a 3D image carousel and light/dark theme toggle. The site uses MySQL for user data storage and session-based authentication with "remember me" functionality.

**Key Components:**
- **Pages**: Separate PHP files (index.php, User.php, Inscription.php, profil.php, Contact.php) that include shared header.php/footer.php
- **Database**: Auto-created MySQL database (`bdd_ifosup`) with User table; connection via PDO in config/config.php
- **UI Components**: JavaScript classes for 3D carousel (Carousel3D) and theme toggling (themeClairDark)
- **Styling**: CSS with dark mode support via `.dark-mode` class

## Coding Patterns & Conventions

### PHP Authentication & Sessions
- Use `session_start()` at the top of every page requiring user state
- Store user data in `$_SESSION` with prefixes: `user_id`, `user_nom`, `user_prenom`, etc.
- Implement "remember me" with secure tokens: generate with `bin2hex(random_bytes(32))`, hash with `password_hash()`, store in cookie as `token|user_id`
- Redirect unauthenticated users: `header('Location: User.php'); exit;`

**Example login validation:**
```php
$requete = "SELECT * FROM User WHERE nom_de_compte = ?";
$statement = $pdo->prepare($requete);
$statement->execute([$Pseudo]);
$user = $statement->fetch(PDO::FETCH_ASSOC);
if ($user && password_verify($pdw, $user['pwd'])) {
    $_SESSION['user_id'] = $user['id'];
    // ... set other session vars
}
```

### Form Handling & Validation
- Validate inputs server-side with `trim()`, `strlen()`, `filter_var()` for emails
- Display errors in `<ul class="error">` with `htmlspecialchars()`
- Use prepared statements for all database queries to prevent SQL injection
- Success messages in `<p class="success">`

**Example registration:**
```php
$hash_mdp = password_hash($pass, PASSWORD_DEFAULT);
$requete = "INSERT INTO User(nom, prenom, mail, pwd, nom_de_compte) VALUES(?, ?, ?, ?, ?)";
$statement = $pdo->prepare($requete);
$statement->execute([$nom, $prenom, $email, $hash_mdp, $NomCompte]);
```

### JavaScript Classes
- Use ES6 classes for UI components (Carousel3D, themeClairDark)
- Initialize on DOMContentLoaded: `document.addEventListener('DOMContentLoaded', () => { ... })`
- Store theme preference in localStorage with key `'theme'`
- Toggle dark mode by adding/removing `'dark-mode'` class on `document.documentElement`

**Example theme toggle:**
```javascript
class themeClairDark {
  toggle() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
  setTheme(theme) {
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }
}
```

### Database Schema
- User table: `id` (AUTO_INCREMENT), `nom`, `prenom`, `mail` (UNIQUE), `nom_de_compte` (UNIQUE), `pwd` (hashed)
- Database created automatically in config.php if not exists

### File Structure
- **config/config.php**: Database setup and connection
- **core/**: Placeholder for future utilities (currently empty)
- **css/**: style.css (main), theme.css (dark mode)
- **js/**: Component classes and utilities
- **Image/**: Static assets organized in subfolders

### Development Workflow
- No build process required; serve PHP files directly with a web server (Apache/Nginx) and MySQL
- Database schema auto-creates on first run
- Test forms by submitting data and checking session state
- Debug carousel by inspecting `#carousel3d` container and image array

### Security Notes
- Always use `htmlspecialchars()` for user output to prevent XSS
- Passwords hashed with `PASSWORD_DEFAULT`
- PDO with prepared statements for all queries
- Session regeneration not implemented; consider adding for production</content>
<parameter name="filePath">.github/copilot-instructions.md