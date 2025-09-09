# 📸 Image Resizing API (Node.js + TypeScript + Express + Sharp)

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)  
![Express](https://img.shields.io/badge/Express.js-4-black?logo=express)  
![Sharp](https://img.shields.io/badge/Sharp-Image%20Processing-orange)  
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?logo=jasmine)  
![Lint](https://img.shields.io/badge/Lint-ESLint-purple?logo=eslint)  
![Format](https://img.shields.io/badge/Format-Prettier-yellow?logo=prettier)

A simple API built with **TypeScript** and **Node.js (Express)** that resizes images using [Sharp](https://sharp.pixelplumbing.com/).  
It supports **caching** of resized images inside the `thumbs/` folder for faster responses.  
Includes **tests** (Jasmine + SuperTest) and code formatting/linting (ESLint + Prettier).

---

## 📂 Project Structure
```
Building-a-Server-Project/
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── routes/
│   │   └── images.ts
│   └── utilities/
│       └── imageProcessor.ts
├── tests/
│   ├── helpers/imageProcessorSpec.ts
│   └── routes/imagesSpec.ts
├── images/          # Original images (input)
├── thumbs/          # Cached resized images (output)
├── package.json
├── tsconfig.json
├── jasmine.json
└── README.md
```

---

## 🚀 Features
- Resize images dynamically (`width`, `height`).
- Cache resized images for future requests.
- Error handling for missing/invalid parameters.
- Unit + integration tests with Jasmine and SuperTest.
- Linting (ESLint) and formatting (Prettier).

---

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/image-resizing-api.git
   cd image-resizing-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🛠 Usage

### Development (auto-reload)
```bash
npm run dev
```

### Build & Run (production)
```bash
npm run build
npm start
```
Or run directly with Node
```bash
node dist/index
```

Server will start on [http://localhost:3000](http://localhost:3000).

---

## 📡 API Endpoint

**GET** `/api/images?filename=<name>&width=<px>&height=<px>`

### Example
```
http://localhost:3000/api/images?filename=encenadaport.jpg&width=300&height=200
```

- **filename** → image file in `images/` (e.g., `fjord.jpg`)  
- **width** → positive integer  
- **height** → positive integer  

✅ First request → resizes with Sharp and saves in `thumbs/`  
✅ Next requests → serves cached file instantly  

---

## ✅ Tests
Run all tests (unit + integration):
```bash
npm test
```

Frameworks: **Jasmine + SuperTest**

---

## 🧹 Code Quality
- Lint check:
  ```bash
  npm run lint
  ```
- Auto-format:
  ```bash
  npm run prettier
  ```

---

## 📌 Notes
- Only `.jpg` images are supported by default (easy to extend for PNG/WebP).
- Add your source images into the `images/` folder.
- Cached resized versions are stored in `thumbs/`.

---

## 👨‍💻 Author
Built by [Ali Odeh](https://github.com/Ali-Odeh) 
