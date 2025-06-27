# Hiei's Coffee | 比叡の喫茶店 ☕

A minimalist, bilingual blog with a coffee-themed design. Built with vanilla HTML, CSS, and JavaScript featuring dynamic language switching, theme toggling, and tag-based filtering.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: Switch between English and Traditional Chinese (Hong Kong)
- **Dark/Light Theme**: Toggle between coffee-inspired light and dark themes
- **Tag-based Filtering**: Search and filter posts by tags
- **Responsive Design**: Optimized for desktop and mobile devices
- **Local Storage**: Remembers user preferences (language and theme)

### Technical Features
- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **CSS Custom Properties**: Dynamic theming with CSS variables
- **Modern ES6+ Syntax**: Uses classes, async/await, and modern JavaScript features
- **JSON Data Source**: Posts loaded dynamically from `posts.json`
- **Smooth Animations**: CSS animations and transitions throughout
- **Accessible Design**: ARIA labels and semantic HTML

## 🎨 Design Theme

The blog uses a warm coffee-inspired color palette:

### Light Theme (Default)
- **Background**: Cream white (#faf8f5)
- **Text**: Dark espresso (#2c1810)
- **Accents**: Coffee brown (#6f4e37)
- **Secondary**: Latte brown (#a0825a)

### Dark Theme
- **Background**: Dark espresso (#1a1612)
- **Text**: Light cream (#f5f2ed)
- **Accents**: Light latte (#d4a574)
- **Secondary**: Medium latte (#b8935f)

## 🚀 Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Hieizan-Kissaten.git
   cd Hieizan-Kissaten
   ```

2. Serve the files using a local server (required for JSON loading):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

### File Structure
```
Hieizan-Kissaten/
├── index.html          # Main HTML structure
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
├── posts.json          # Blog posts data
└── README.md          # This file
```

## 📝 Adding New Posts

Posts are stored in `posts.json`. Each post follows this structure:

```json
{
  "id": 1,
  "title": {
    "en": "English Title",
    "zh_hk": "中文標題"
  },
  "content": {
    "en": "English content...",
    "zh_hk": "中文內容..."
  },
  "date": "2025-01-15",
  "tags": ["Tag1", "Tag2"]
}
```

### Adding a New Post
1. Open `posts.json`
2. Add your post object to the array
3. Ensure both English and Chinese content are provided
4. Use ISO date format (YYYY-MM-DD)
5. Tags are case-sensitive and used for filtering

## 🛠️ Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:

```css
:root {
  --bg-primary: #your-color;
  --text-primary: #your-color;
  --accent-primary: #your-color;
  /* ... other variables */
}
```

### Adding New Languages
1. Add language data attributes to HTML elements in `index.html`
2. Update the `applyLanguage()` method in `script.js`
3. Add translations to post objects in `posts.json`

### Modifying Fonts
The blog uses:
- **English**: 'Open Sans' (Google Fonts)
- **Chinese**: 'Noto Serif TC' (Google Fonts)

Update the font imports in `index.html` and CSS variables in `styles.css`.

## 🎯 Usage

### Language Toggle
- Click the **EN/中** button in the header to switch languages
- Preference is saved in localStorage

### Theme Toggle
- Click the **☀️/🌙** button to switch between light and dark themes
- Preference is saved in localStorage

### Tag Filtering
- Use the search box to filter posts by tags
- Support multiple tags separated by commas or spaces
- Click on post tags to add them to the filter
- Click the **×** button to clear the search

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Features Used**: CSS Grid, Flexbox, CSS Custom Properties, ES6+ JavaScript
- **Mobile**: Responsive design works on all modern mobile browsers

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (max-width container)
- **Tablet**: 768px and below (stacked navigation)
- **Mobile**: 480px and below (compact design)

## 🔧 Development

### Code Structure
The JavaScript follows a class-based architecture:

```javascript
class Blog {
  constructor()           // Initialize blog
  async init()           // Setup and load posts
  async loadPosts()      // Fetch posts from JSON
  toggleTheme()          // Handle theme switching
  toggleLanguage()       // Handle language switching
  handleSearch()         // Process tag filtering
  renderPosts()          // Display filtered posts
  // ... other methods
}
```

### Performance Features
- **Lazy Loading**: Posts animated in sequence
- **Debounced Search**: Smooth filtering experience
- **Local Storage**: Persistent user preferences
- **Minimal Dependencies**: Fast loading times

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Made with ☕ and 💻*

*README.md generated by AI, haha*