# Ultra Shopping Store

GitHub Pages-ready static shopping/product-discovery storefront using HTML5, Tailwind CSS Play CDN, Flowbite, daisyUI, and Vanilla JavaScript.

## Deploy
Upload the entire folder to a GitHub repository and enable GitHub Pages. No build step, backend, database, or Node runtime is required.

## Notes
- Product/category/brand/deal/FAQ/banner content lives in `js/data/`.
- Persistent state uses browser `localStorage`.
- Deep links use `product.html?id=...`, `category.html?slug=...`, `search.html?q=...`.
- Replace sample affiliate links and image URLs in the data files before publishing.
- Tailwind's browser CDN is used to preserve the requested zero-build GitHub Pages workflow.
