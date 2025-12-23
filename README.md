# Siempre

A sub-theme of Claro designed for flexible, user-facing administrative use.

## Accent Color Configuration

The Siempre theme includes a configurable accent color system that allows you to customize the primary and complimentary colors throughout your site.

### Configuring the Accent Color

1. Go to **Appearance > Settings > Siempre** in your Drupal admin
2. Find the "Accent Color" field under "Siempre Theme Settings"
3. Use the color picker to select your desired accent color (default: rgb(0,54,177) / #0036b1)
4. Save the configuration

### How It Works

The theme automatically generates complementary color variants from your selected accent color:
- **Base accent**: Used for primary links and UI elements
- **Light variant**: Used for secondary elements and hover states
- **Lighter variant**: Used for subtle accents
- **Dark variant**: Used for hover states and borders
- **Darker variant**: Used for visited links and pressed states

### Elements Using Accent Colors

The accent color system affects:
- All standard links (a tags)
- Breadcrumb item borders
- Menu and toolbar backgrounds (.toolbar-bar, .toolbar-menu-administration)
- Views field links (e.g., td.views-field-field-submission-report-type a)
- Primary buttons and submit inputs
- Link hover and focus states
- Visited link colors

The system uses CSS custom properties (variables), so all colors update dynamically when you change the accent color setting.

## Footer and Subfooter

This theme includes footer and subfooter regions styled similar to the Princeton ORFE website.

### Regions Available

The theme provides 6 regions organized into two 3-column sections:

**Footer (3 columns)**
- Footer first column
- Footer second column
- Footer third column

**Subfooter (3 columns)**
- Subfooter first column
- Subfooter second column
- Subfooter third column

## Deployment

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/princeton-orfe/siempre.git
   ```

2. **Deploy to your Drupal installation:**
   ```bash
   rsync -azv --exclude-from='siempre/.rsyncignore' siempre/ www/themes/custom/siempre/
   ```

   Or if you're already in the siempre directory:
   ```bash
   rsync -azv --exclude-from='.rsyncignore' ./ /path/to/drupal/themes/custom/siempre/
   ```

3. **Clear Drupal cache:**
   ```bash
   drush cache:rebuild
   ```

   Or via the admin UI: **Configuration > Development > Performance > Clear all caches**

4. **Enable the theme:**
   - Go to **Appearance** in your Drupal admin
   - Click **Install and set as default** for Siempre
