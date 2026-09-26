Act as an expert Frontend Developer specializing in React and Tailwind CSS. 
I need you to build a landing page for a tourism website based on the provided UI design. 
Please create clean, modular, and responsive components following these exact specifications:

### 1. Global Styles & Theming
- **Typography:** Use a clean Sans-serif (e.g., Inter or Figtree) for body text and a classic Serif (e.g., Playfair Display or Fraunces) for emphasized headings (italicized sections like "Budaya Kaya", "Wajib Dikunjungi")[cite: 6].
- **Color Palette[cite: 6]:**
  - **Primary Blue:** Used for the stats bar and primary buttons.
  - **Soft Pink:** Used as the background for the Destinations and Culture sections.
  - **Light Blue:** Used as the background for the Testimonials section.
  - **Dark Forest Green:** Used for the bottom CTA section and Footer.
  - **Accent Pink:** Used for the CTA button in the dark green section.
  - **Text Colors:** Dark slate for main headings, muted gray for paragraph text, and white for text on dark backgrounds.

### 2. Component Breakdown & Layout Instructions

**A. Hero Section[cite: 6]**
- **Background:** Full-width hero image with a dark overlay to make text readable.
- **Navbar:** Transparent, overlaid on the hero image. Logo on the left, navigation links in the center, and a primary button on the right.
- **Content:** Left-aligned heading. "Alam Liar," (Sans-serif), "Budaya Kaya," (Serif, Italic), "Lampung" (Sans-serif, colored blue).
- **Buttons:** Two buttons side-by-side (Primary solid blue, Secondary outline white).

**B. Stats Bar[cite: 6]**
- Full-width block with a primary blue background.
- 4 equally spaced columns using Flexbox or Grid.
- Each item contains a large number/stat and a smaller label text underneath (e.g., 17+ Kabupaten/Kota). Text is white.

**C. Destinations Section ("Tempat yang Wajib Dikunjungi")[cite: 6]**
- **Background:** Soft pink.
- **Header:** Section title with mixed typography (Sans-serif + Italic Serif).
- **Filter Tabs:** A horizontal row of pill-shaped tabs (e.g., Alam, Budaya, Pantai).
- **Grid:** A responsive CSS Grid (2 columns on tablet, 3-4 on desktop) for destination cards.
- **Card UI:** White background, rounded corners, soft shadow.
  - Top: Border-radius image.
  - Body: Title, 5-star rating icon + number, short truncated description, price tag, and a "Lebih Lanjut" link.

**D. Culture Section ("Budaya Lampung yang Abadi")[cite: 6]**
- **Background:** Soft pink.
- **Layout:** 2-column split (Grid or Flex).
- **Left Column:** Section title, introductory paragraph, and a 2x2 grid of feature cards (light blue/white cards for specific culture points like "Tari Siger").
- **Right Column:** A masonry-style or overlapping photo collage showing cultural images.

**E. Gallery Section ("GALERI FOTO")[cite: 6]**
- **Background:** White or very light gray.
- **Header:** Centered, small uppercase bold text.
- **Layout:** A horizontal scrollable row or a responsive flex container of images with rounded corners.

**F. Testimonials Section ("Mereka Sudah...")[cite: 6]**
- **Background:** Light blue.
- **Header:** Centered title with mixed typography.
- **Grid:** 3 columns for review cards.
- **Card UI:** White background. Contains a short quote, and a user profile section at the bottom (Avatar image, Name, and Role).

**G. Bottom CTA Section ("Lampung Menunggu Anda")[cite: 6]**
- **Background:** Dark forest green (possibly with a subtle background image blending in).
- **Content:** Left-aligned large heading, short description text (white text), and an accent pink CTA button.

**H. Footer[cite: 6]**
- **Background:** Dark forest green (same as CTA, or slightly darker).
- **Layout:** 4 columns.
- **Col 1:** Logo and short description.
- **Col 2 & 3:** Vertical lists of links.
- **Col 4:** Contact info and social media icons.
- **Bottom:** Divider line and copyright text.

### 3. Technical Requirements
- Make sure all sections have appropriate vertical padding (e.g., `py-16` or `py-24`).
- Use standard Tailwind utility classes for responsive design (`sm:`, `md:`, `lg:`).
- Extract the Destination Card and Testimonial Card into separate reusable React components.
- Use placeholder images (e.g., from Unsplash) for all image assets.

Please generate the code for these components. You can provide it section by section or as a single cohesive page structure.