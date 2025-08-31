# Visual Product Matcher

A web app that lets users **upload an image or provide an image URL** to find visually similar products from a pre-defined catalog using **MobileNet features**.

---

## 🌟 Demo

- Frontend deployed: [https://visual-product-matcher-1-1gc2.onrender.com](https://visual-product-matcher-1-1gc2.onrender.com)
- Backend deployed: [https://visual-product-matcher-ttqw.onrender.com](https://visual-product-matcher-ttqw.onrender.com)

---

## 🛠 Features

- Upload an image from your device or provide a direct image URL.
- Matches products based on **visual similarity** using MobileNet embeddings.
- Adjust similarity threshold with a slider to refine results.
- Handles errors gracefully:
  - Invalid files or URLs
  - Failed feature extraction
  - No matching products found
- Built with **ReactJS frontend** and **Node.js + Express backend**.

---

## 📁 Project Structure

visual-product-matcher/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── build/ # Production build
├── server/ # Node/Express backend
│ ├── server.js
│ └── package.json
├── products.json # Product metadata
└── README.md

---

## 💻 Local Setup

### 1. Clone repository

```bash
git clone https://github.com/JanardanTripathi/Visual-Product-Matcher.git
cd Visual-Product-Matcher
**### 2. Setup Backend**
bash
Copy code
cd server
npm install
npm run dev       # Run server locally on http://localhost:5000
Proxy endpoint: /proxy?url=IMAGE_URL
Example: http://localhost:5000/proxy?url=https://example.com/image.jpg
**3. Setup Frontend**
bash
Copy code
cd ../client
npm install
npm start         # Runs frontend locally on http://localhost:3000
Frontend automatically calls backend proxy when using image URLs.

**🚀 Production Deployment**
**Backend**
Navigate to the server folder.

Deploy the server (e.g., on Render) with server.js as entry point.

Backend URL in production: https://visual-product-matcher-ttqw.onrender.com

**Frontend**
Navigate to the client folder.

git push origin main

bash
Copy code
npm run build
Deploy client/build folder on your hosting provider (Render, Netlify, Vercel, etc.).

Make sure the frontend uses the deployed backend proxy:

js
Copy code
const imageUrl = "https://visual-product-matcher-ttqw.onrender.com/proxy?url=EXTERNAL_IMAGE_URL";
This ensures CORS-safe image fetching in production.

**⚙️ Configuration**
products.json contains product metadata (id, name, thumbnail, etc.).

Features for products are computed on-the-fly when first requested.

Minimum similarity threshold can be adjusted via the slider in the UI.

**📝 Notes**
Use only direct image URLs (images must be publicly accessible).

Frontend handles errors like:

Invalid URLs

Failed image load

No matches found

Backend ensures the /proxy endpoint only returns valid images.

**🛠 Tech Stack**
Frontend: ReactJS, CSS, HTML

Backend: Node.js, Express

Machine Learning: TensorFlow.js, MobileNet

Deployment: Render (both frontend and backend)

**💡 Tips**
Always test image URLs in backend /proxy endpoint first.

Adjust similarity threshold to refine search results.

Keep product catalog updated in products.json.
