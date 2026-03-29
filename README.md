# Meadow Lane Park — Drupal 11 Custom Theme

A clean, modern custom theme for Meadow Lane Park, a resident-owned community
in the 1000 Islands region of New York State.

---

## Requirements

- Drupal 10.x or 11.x
- PHP 8.1+
- No contributed module dependencies (the theme is self-contained)

---

## Installation

1. Copy the `meadow_lane/` folder into your Drupal installation:
   ```
   web/themes/custom/meadow_lane/
   ```

2. Enable the theme in Drupal:
   - Go to **Appearance** (`/admin/appearance`)
   - Find "Meadow Lane Park" and click **Install and set as default**

   Or via Drush:
   ```bash
   drush theme:enable meadow_lane
   drush config:set system.theme default meadow_lane
   drush cache:rebuild
   ```

---

## Theme settings

Navigate to **Appearance → Settings → Meadow Lane Park**
(`/admin/appearance/settings/meadow_lane`) to configure:

| Setting | Description |
|---|---|
| Hero tagline | Main headline in the homepage hero |
| Hero subtext | Supporting paragraph in the hero |
| Contact phone / email / address | Displayed in footer and contact areas |
| Footer tagline | Tagline in the footer brand column |
| Social media links | Facebook URL (more can be added in `theme-settings.php`) |
| Show Member Login button | Toggle the nav CTA on/off until your secure area is ready |

---

## Content types

The theme includes templates for a **Home Listing** content type.
Create this content type at `/admin/structure/types/add` with these fields:

| Field name | Machine name | Type |
|---|---|---|
| Price | `field_price` | Number (decimal) |
| Bedrooms | `field_bedrooms` | Number (integer) |
| Bathrooms | `field_bathrooms` | Number (decimal) |
| Square footage | `field_sqft` | Number (integer) |
| Address | `field_address` | Text (plain) |
| Status | `field_status` | List (text): available, pending, sold |
| Images | `field_images` | Image (multiple) |

---

## Menus

Assign your Drupal menus to regions in **Structure → Block layout**:

| Menu | Region |
|---|---|
| Main navigation | Primary Menu |
| Footer — Community links | Footer First |
| Footer — Real Estate links | Footer Second |
| Footer — Residents links | Footer Third |

---

## Libraries

| Library key | Purpose |
|---|---|
| `meadow_lane/global-styling` | Loaded on every page (CSS + base JS) |
| `meadow_lane/navigation` | Mobile menu behavior |
| `meadow_lane/listings` | Client-side listing filter on homes-for-sale pages |
| `meadow_lane/member-area` | Placeholder styles for future secure member portal |

Attach extra libraries from a preprocess function or a block:
```php
$variables['#attached']['library'][] = 'meadow_lane/listings';
```

---

## File structure

```
meadow_lane/
├── meadow_lane.info.yml          Theme definition
├── meadow_lane.libraries.yml     CSS/JS library declarations
├── meadow_lane.breakpoints.yml   Responsive breakpoints
├── meadow_lane.theme             Preprocess functions & hooks
├── theme-settings.php            Admin settings form
│
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css         Design tokens (colours, spacing, type)
│   │   └── typography.css
│   ├── layout/
│   │   ├── layout.css
│   │   └── grid.css
│   └── components/
│       ├── navigation.css
│       ├── hero.css
│       ├── buttons.css
│       ├── cards.css
│       ├── amenities.css
│       ├── listings.css
│       ├── forms.css
│       ├── footer.css
│       └── member-area.css       Ready for future member portal
│
├── js/
│   ├── global.js                 Skip link, smooth scroll, scroll header
│   ├── navigation.js             Mobile menu toggle + accessibility
│   └── listings.js               Client-side listing filter
│
├── images/                       Place logo, favicon, and SVG assets here
│
└── templates/
    ├── layout/
    │   ├── html.html.twig
    │   ├── page.html.twig        Default page
    │   ├── page--front.html.twig Homepage override
    │   └── region.html.twig
    ├── navigation/
    │   └── block--system-menu-block--main.html.twig
    ├── block/
    │   └── block.html.twig
    └── node/
        ├── node--home-listing--teaser.html.twig
        └── node--home-listing--full.html.twig
```

---

## Customisation tips

- **Colours**: All design tokens are in `css/base/variables.css`. Change
  `--clr-teal` and `--clr-slate` to rebrand the entire theme.
- **Fonts**: Google Fonts are loaded in `meadow_lane.theme` via
  `meadow_lane_page_attachments_alter()`. Swap the font URL there and update
  `--font-serif` / `--font-sans` in `variables.css`.
- **Hero content**: The hero tagline and subtext are editable via theme
  settings, so a non-developer admin can update them without touching code.
- **Member area**: The `member-area.css` and `show_member_login` setting are
  already stubbed out. When you're ready to build the secure portal, the CSS
  skeleton and nav toggle are waiting.

---

## Drush cache commands (run after any template/CSS change)

```bash
drush cache:rebuild
# or shorthand:
drush cr
```

---

*Theme built for Drupal 11 · Meadow Lane Park · Alexandria Bay, NY*

---

## Homes for Sale

### Page template
`templates/layout/page--homes-for-sale.html.twig` is automatically used when
a node or View is served at the path `/homes-for-sale`.

### Views
`config/install/views.view.homes_for_sale.yml` defines the listing View.
Import it via:
```bash
drush config:import --partial --source=themes/custom/meadow_lane/config/install
drush cache:rebuild
```
Or import manually at `/admin/config/development/configuration/single/import`.

### Content type fields
The `config/install/` directory contains field storage definitions for the
`home_listing` content type. Create the content type first at
`/admin/structure/types/add` (machine name: `home_listing`), then import
the field config or add fields manually:

| Label | Machine name | Type |
|---|---|---|
| Price | `field_price` | Decimal |
| Bedrooms | `field_bedrooms` | Integer |
| Bathrooms | `field_bathrooms` | Decimal |
| Square footage | `field_sqft` | Integer |
| Street address | `field_address` | Text (plain) |
| Status | `field_status` | List (text): available, pending, sold |
| Photos | `field_images` | Image (unlimited) |

### Filter bar
The filter bar in `page--homes-for-sale.html.twig` is driven by
`js/listings.js`. It reads `data-price`, `data-beds`, and `data-status`
attributes on each `.listing-card`. These are set in
`node--home-listing--teaser.html.twig` via the preprocessed variables.

Make sure `meadow_lane_preprocess_node()` in `meadow_lane.theme` is populating
`listing_price`, `listing_beds`, `listing_baths`, `listing_sqft`,
`listing_address`, and `listing_status` from the node fields.
