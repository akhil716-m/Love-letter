# 💌 WithLove - Digital Handwritten Letters

A beautiful, minimalist web application for creating and sharing digital handwritten letters. Express your feelings with custom paper textures, ink styles, and adorable stickers. Powered by Gemini AI to help you find the perfect words.

![Project Preview](https://images.unsplash.com/photo-1512418490979-92798cccf320?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Features

- **Custom Stationery**: Choose between plain, dotted, grid, or heart-patterned A4 sheets.
- **Handwriting Styles**: Multiple font options from elegant script to classic typewriter.
- **AI-Powered Writer**: Stuck? Use the integrated Gemini AI to generate heartfelt messages based on your mood (Romantic, Poetic, Friendly, etc.).
- **Sticker Decorations**: Personalize your letters with a variety of fun emojis.
- **Instant Sharing**: Generate a unique link (base64 encoded) that you can send to your loved ones. No database required!
- **Interactive Unboxing**: Recipients get a beautiful envelope-opening experience.

## 🚀 Getting Started

### Prerequisites
- Node.js & npm/yarn/pnpm
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/withlove.git
   ```

2. Install dependencies (if using a local development environment):
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file or set the following variable:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

### Running the App
The application uses modern ESM modules and can be served using any static web server or the built-in development environment.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [@google/genai (Gemini 2.5/3)](https://ai.google.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Caveat, Dancing Script, Playfair Display, Courier Prime)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---
*Made with love for loved ones.*