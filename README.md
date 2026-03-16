# Tayyab Marwat — Portfolio Website

A modern, fully responsive portfolio website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | Framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Responsive styling |
| **Framer Motion** | Smooth animations |
| **React Icons** | Iconography |
| **next-themes** | Dark/Light mode |

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with metadata & ThemeProvider
├── page.tsx            # Main page (assembles all sections)
├── globals.css         # Global styles & CSS variables
├── components/
│   ├── Navigation.tsx  # Sticky navbar with mobile menu & theme toggle
│   ├── Hero.tsx        # Hero/landing section with animations
│   ├── About.tsx       # About + Education & Experience
│   ├── Projects.tsx    # Project cards grid
│   ├── Skills.tsx      # Skills with animated progress bars
│   ├── Contact.tsx     # Contact form with validation
│   └── Footer.tsx      # Footer with links
└── config/
    └── portfolio.ts    # All portfolio content (easy to customize)
public/
└── assets/
    └── imgs/           # Place your images here (home.png, aboutpic.jpeg)
```

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

All portfolio content is centralized in **`app/config/portfolio.ts`**. Edit this file to update:

- Personal information (name, bio, social links)
- Projects list
- Skills and proficiency levels
- Education and work experience
- SEO metadata

### Adding Your Images

Place your images in `public/assets/imgs/`:
- `home.png` — Profile photo for the Hero section
- `aboutpic.jpeg` — Photo for the About section

Then set `hasImage = true` in `Hero.tsx` and `About.tsx`.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Deploy with one click — zero configuration needed

### Other Platforms

```bash
npm run build
# Serve the .next directory with Node.js
npm start
```

## 📧 Contact Form Setup

The contact form currently simulates submission. To make it functional:

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and copy your endpoint URL
3. Copy `.env.example` to `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
   ```
4. Update the `handleSubmit` function in `app/components/Contact.tsx` to POST to your endpoint.

## 🌙 Dark/Light Mode

Dark mode is enabled by default. Users can toggle between modes using the sun/moon icon in the navigation bar. The preference is persisted across sessions.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigable
- Focus indicators
- Screen reader friendly
- Color contrast compliant (WCAG AA)

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.
