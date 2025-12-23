# siempre
Sub-theme of Claro to repurpose the theme for more flexible and user-facing administrative use.

## Footer and Subfooter

This theme includes footer and subfooter regions styled similar to the Princeton ORFE website.

### Regions Available

- **Footer**: Main footer region with dark background (#262626)
- **Subfooter**: Bottom-most footer region with darker background (#1a1a1a) for legal notices and utility links

### Adding Content to Footer and Subfooter

1. Go to **Structure > Block layout** in your Drupal admin
2. Find the "Footer" and "Subfooter" regions
3. Place blocks in these regions

### Recommended Content Structure

#### Footer Region
The footer uses a responsive 3-column grid layout. You can add blocks with:
- Contact information (address, phone, email)
- Social media links
- Department/site branding
- Quick links or navigation

#### Subfooter Region
The subfooter is designed for a 3-column layout with:
- **Left column**: Utility links (wrap in a div with class `subfooter-links`)
  - Accessibility statement
  - Non-discrimination policy
  - Other legal/policy links
- **Middle column**: Copyright text (wrap in a `<p>` with class `copyright-text`)
- **Right column**: Logo or institutional branding (wrap in a div with class `copyright`)

### Example Subfooter HTML Structure

```html
<!-- Left column: Links -->
<div class="subfooter-links">
  <ul class="list-unstyled">
    <li><a href="/accessibility">Accessibility Help</a></li>
    <li><a href="/non-discrimination">Non-Discrimination</a></li>
  </ul>
</div>

<!-- Middle column: Copyright -->
<p class="copyright-text">
  © 2025 Your Organization Name
</p>

<!-- Right column: Logo -->
<div class="copyright">
  <a href="https://yoursite.edu" class="no-border" title="Your Organization">
    <img src="/path/to/logo.svg" alt="Your Organization">
  </a>
</div>
```

### Styling

The footer and subfooter are styled to match the Princeton ORFE website:
- **Footer**: Dark background (#333), 5px Princeton orange (#e77500) top border, white text
- **Subfooter**: Slightly darker background (#1d1d1d), light gray text (#ccc)
- Princeton orange (#e77500) hover state for links
- Responsive grid layouts that stack on mobile devices
- Proper spacing and typography matching the Princeton design system

You can customize colors and spacing by editing `css/siempre.scss` and recompiling to CSS, or directly edit `css/siempre.css`.
