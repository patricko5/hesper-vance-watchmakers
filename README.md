# Hesper & Vance

> Mechanical watches assembled in small sequences. The movement is the record of the hand.

![Hesper & Vance](https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop) *(Placeholder image)*

Hesper & Vance is an independent watchmaking atelier based in Geneva, Switzerland. This repository contains the source code for the official storefront and digital atelier, providing a premium, highly-crafted web experience for collectors to view current models, study the movement, and reserve limited editions.

## 🕰️ The Digital Atelier

The digital experience is designed to mirror the physical craftsmanship of our timepieces:
- **Premium Aesthetics:** Clean typography, glassmorphism, and a high-contrast dark mode to highlight product photography.
- **Micro-interactions:** Custom GSAP animations and smooth scroll transitions that feel mechanical and precise.
- **3D Product Visuals:** Interactive Three.js (React Three Fiber) models to study the timepieces from every angle.

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://gsap.com/)
- **3D Rendering:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Three.js](https://threejs.org/)
- **Database / ORM:** [Prisma](https://www.prisma.io/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

To run the digital atelier locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/patricko5/hesper-vance-watchmakers.git
   cd hesper-vance-watchmakers
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Copy the `.env.example` file to `.env` and fill in your database credentials:
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database:**
   ```bash
   npm run prisma:generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to visit the atelier.

## 📍 Location

**Hesper & Vance**  
Rue du Rhône 41  
1204 Geneva  
Switzerland  

---
*No public sales list. Notes from the atelier, delivery windows, and service advisories only.*
