# GEMINI.md - Siempre Theme

## Project Overview
**Siempre** is a Drupal 10/11 sub-theme of **Claro**, designed to repurpose the administrative theme for more flexible and user-facing administrative use. It provides a configurable accent color system, custom layouts for specific forms (like user profile updates and report submissions), and enhanced UI components like a "Jump to" navigation and custom file upload widgets.

- **Type:** Drupal Theme (Sub-theme of Claro)
- **Base Theme:** Claro
- **Core Compatibility:** ^9 || ^10 || ^11
- **Key Features:**
    - **Tiger Standards Integration:** Applies Princeton's "Tiger" design language (typography using Sofia Pro and Abril Text, standardized spacing, and neutral color scales) while retaining the blue accent system.
    - **Princeton Branding:** Includes the Princeton Bar and updated subfooter with the University shield.

    - **Dynamic Accent Color:** Configurable via theme settings; automatically generates light/dark variants using HSL calculations in `siempre.theme`.
    - **Jump-to Navigation:** A sticky secondary nav bar (`js/jump-to.js`) that auto-populates from H2 headings on long pages.
    - **Report Workflow Enhancements:** Specialized templates and logic for a "report" node bundle, including consolidated grade fields and custom submission metadata sidebars.
    - **Enhanced File Widget:** Custom "Remove" confirmation (`js/file-remove-confirm.js`) and a re-skinned PDF upload widget.

## Building and Running
As a Drupal theme, Siempre does not require a complex build step unless you are modifying the SCSS.

- **Prerequisites:** A Drupal installation with the Claro theme available.
- **Installation:**
    1. Place the `siempre` directory in `/themes/custom/`.
    2. Enable via the Drupal Admin UI (`Appearance`) or Drush: `drush theme:enable siempre`.
    3. (Optional) Set as default: `drush config-set system.theme default siempre`.
- **CSS Compilation:** The project includes `css/siempre.scss`. If you make changes to the SCSS, you must compile it to `css/siempre.css`.
    - *Note:* There is no explicit build script in the repo. You likely need a standard Sass compiler.
- **Clearing Cache:** After making changes to templates or `.theme` hooks:
    ```bash
    drush cr
    ```

## Development Conventions

### Backend (PHP/Drupal Hooks)
- Core logic resides in `siempre.theme`.
- **Naming:** Follow Drupal's standard hook naming: `siempre_preprocess_HOOK`, `siempre_form_ALTER`.
- **Dynamic CSS:** Accent colors are calculated in `_siempre_calculate_color_variants` and injected as CSS variables in `siempre_preprocess_html`.

### Frontend (CSS/JS)
- **Styling:** Prefers Vanilla CSS/SCSS. Uses CSS Custom Properties (variables) for the accent color system (e.g., `--siempre-accent`).
- **JavaScript:** Follows Drupal's behaviors pattern (`Drupal.behaviors`). Uses `once` library to ensure scripts run only once per element.
- **Templates:** Twig templates are located in `templates/`. Key overrides include `page.html.twig` and field-level overrides.

### File Handling
- Use `.rsyncignore` when deploying to production to avoid uploading unnecessary files like `.git` or `.scss`.

## Key Files
- `siempre.info.yml`: Core theme metadata and library definitions.
- `siempre.theme`: The "brains" of the theme, containing all PHP hooks and color calculation logic.
- `theme-settings.php`: Defines the configuration form for the accent color.
- `css/siempre.css`: The main compiled stylesheet.
- `js/jump-to.js`: Logic for the auto-generated "Jump to" menu.
- `js/file-remove-confirm.js`: Adds a safety confirmation to the file removal action.
