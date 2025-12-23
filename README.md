# siempre
Sub-theme of Claro to repurpose the theme for more flexible and user-facing administrative use.

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

### Adding Content to Footer and Subfooter

1. Go to **Structure > Block layout** in your Drupal admin
2. Find the footer and subfooter column regions
3. Place blocks in the appropriate columns

### Recommended Content Structure

#### Footer Columns
The footer has 3 equal-width columns. Typical usage:
- **First column**: Contact information (address, phone, email)
- **Second column**: Social media links or quick links
- **Third column**: Department/site branding or additional navigation

#### Subfooter Columns
The subfooter also has 3 equal-width columns. Typical usage:
- **First column**: Utility links (Accessibility, Non-discrimination, etc.)
- **Second column**: Copyright text
- **Third column**: Logo or institutional branding

### Example Block Content

When creating custom blocks for the subfooter:

**Subfooter First Column** - Links block:
```html
<div class="subfooter-links">
  <ul class="list-unstyled">
    <li><a href="/accessibility">Accessibility Help</a></li>
    <li><a href="/non-discrimination">Non-Discrimination</a></li>
  </ul>
</div>
```

**Subfooter Second Column** - Copyright block:
```html
<p class="copyright-text">
  © 2025 Your Organization Name
</p>
```

**Subfooter Third Column** - Logo block:
```html
<a href="https://yoursite.edu" class="no-border" title="Your Organization">
  <img src="/path/to/logo.svg" alt="Your Organization">
</a>
```

### Styling

The footer and subfooter are styled to match the Princeton ORFE website:
- **Footer**: Dark background (#333), 5px Princeton orange (#e77500) top border, white text
- **Subfooter**: Slightly darker background (#1d1d1d), light gray text (#ccc)
- Princeton orange (#e77500) hover state for links
- Responsive grid layouts that stack on mobile devices
- Proper spacing and typography matching the Princeton design system

You can customize colors and spacing by editing `css/siempre.scss` and recompiling to CSS, or directly edit `css/siempre.css`.
