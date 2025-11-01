# Projects Image Gallery Structure

This directory contains image galleries for all Falibra Group projects featured on the website.

## Directory Structure

```
Projects/
├── cmis_mamou/                     ✓ 7 images
├── government_printing_press/      ✓ 6 images
├── voile_de_la_mariee/             ✓ 5 images
├── donka_orthopedic/
├── ors_siguiri/                    ✓ 1 image
└── ast_kankan/
```

## How to Add Project Images

### 1. Prepare Your Images
- Use JPEG or JPG format for best compatibility
- Recommended dimensions: 1200px width minimum
- Optimize images to keep file size under 500KB each
- Name images sequentially: `image1.jpeg`, `image2.jpeg`, etc.

### 2. Add Images to Project Directory
Place your images in the corresponding project folder:
- **CMIS Mamou**: `cmis_mamou/` (already configured)
- **Government Printing Press**: `government_printing_press/`
- **Voile de la Mariée**: `voile_de_la_mariee/`
- **Donka Orthopedic Center**: `donka_orthopedic/`
- **ORS School Complex Siguiri**: `ors_siguiri/`
- **AST Complex Kankan**: `ast_kankan/`

### 3. Update projects.html

For each project, update the image paths in `projects.html`.

**Example - Government Printing Press:**

```html
<img src="Projects/government_printing_press/image1.jpeg" alt="Government Printing Press - Main Building" class="gallery-item main-image" data-gallery="printing" data-index="0">
<div class="additional-images">
    <img src="Projects/government_printing_press/image2.jpeg" alt="Printing Equipment Installation" class="gallery-item" data-gallery="printing" data-index="1">
    <img src="Projects/government_printing_press/image3.jpeg" alt="Office Spaces" class="gallery-item" data-gallery="printing" data-index="2">
    <!-- Add more images as needed -->
</div>
```

### 4. Update Photo Count

Don't forget to update the image count overlay:

```html
<div class="gallery-overlay">
    <span class="image-count">5 Photos</span>  <!-- Update this number -->
</div>
```

## Current Status

| Project | Images Added | Status |
|---------|-------------|---------|
| CMIS Mamou | 7 | ✓ Complete |
| Government Printing Press | 6 | ✓ Complete |
| Voile de la Mariée | 5 | ✓ Complete |
| Donka Orthopedic Center | 0 | Placeholder |
| ORS Siguiri | 1 | ✓ In Progress |
| AST Kankan | 0 | Placeholder |

## Notes

- The first image in each gallery is the main/featured image
- All other images appear in the "additional-images" section
- Update the `data-index` sequentially starting from 0
- Keep alt text descriptive for SEO and accessibility
