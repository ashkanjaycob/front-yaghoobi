# front-yaghoobi

A responsive blog front end built with Vite and Tailwind CSS. It includes a mobile drawer menu, search UI, post previews, and modal interactions.

---

## Prerequisites

* **Node.js** (LTS recommended)
* **npm** (comes with Node.js)

---

## Getting Started

1. **Install dependencies:**
```bash
   npm install
```
2. Start the development server:

```bash
npm run dev 
```
3. Open the app:
Open the app in your browser at the URL shown in the terminal (default: http://localhost:5173/).

Project Structure 
├── index.html          # App entry HTML
├── public/             # Static assets served as-is
├── src/
│   ├── assets/         # SVG icons and images
│   ├── css/            # Global styles (reset, Tailwind)
│   └── js/             # Menu, modal, posts, search modules
└── vite.config.js      # Vite + Tailwind configuration

4. Testing on a Mobile Device
5. 
The dev server is configured to listen on your local network (server.host: true in vite.config.js), so you can preview on a phone or tablet on the same Wi‑Fi.

Run npm run dev on your computer.

Note the Network URL in the terminal.

Tips
Phone and computer must be on the same Wi‑Fi network.

If the page does not load, check macOS firewall settings and allow incoming connections for Node/Vite.

To find your machine’s IP manually on macOS, run:

ipconfig getifaddr en0
