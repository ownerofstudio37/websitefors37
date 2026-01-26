-- Migration: Add Locations menu item with dropdown to navigation
-- Updated January 26, 2026

UPDATE settings 
SET navigation_items = '[
  {
    "id": "home",
    "label": "Home",
    "href": "/",
    "order": 1,
    "visible": true
  },
  {
    "id": "gallery",
    "label": "Gallery",
    "href": "/gallery",
    "order": 2,
    "visible": true
  },
  {
    "id": "locations",
    "label": "Locations",
    "href": "/service-area",
    "order": 3,
    "visible": true,
    "children": [
      {
        "id": "pinehurst",
        "label": "Pinehurst, TX",
        "href": "/local-photographer-pinehurst-tx",
        "order": 1,
        "visible": true
      },
      {
        "id": "magnolia",
        "label": "Magnolia, TX",
        "href": "/magnolia",
        "order": 2,
        "visible": true
      }
    ]
  },
  {
    "id": "services",
    "label": "Services",
    "href": "/services",
    "order": 4,
    "visible": true
  },
  {
    "id": "blog",
    "label": "Blog",
    "href": "/blog",
    "order": 5,
    "visible": true
  },
  {
    "id": "about",
    "label": "About",
    "href": "/about",
    "order": 6,
    "visible": true
  },
  {
    "id": "contact",
    "label": "Contact",
    "href": "/contact",
    "order": 7,
    "visible": true
  },
  {
    "id": "book",
    "label": "Book a Session",
    "href": "/book-a-session",
    "order": 8,
    "visible": true,
    "highlighted": true
  }
]'::jsonb
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid;
