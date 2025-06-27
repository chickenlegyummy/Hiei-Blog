// Blog functionality with language toggle, theme toggle, and tag search 
// Remark: First time ever writing class in JavaScript, I do this just for you, stupid G gor.
class Blog {
    // Field and constructors
    constructor() {
        this.currentLang = 'en';
        this.currentTheme = 'light';
        this.posts = [];
        this.activeTags = new Set();
        
        this.init();
    }
    
    // Methods
    async init() {
        try {
            // Load posts from JSON file
            await this.loadPosts();
            
            // Initialize UI components
            this.initializeTheme();
            this.initializeLanguage();
            this.bindEvents();
            this.renderPosts();
            
            console.log('Coffee Blog initialized successfully');
        } catch (error) {
            console.error('Failed to initialize blog:', error);
            this.showError();
        }
    }
    
    async loadPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error('Failed to load posts');
            }
            this.posts = await response.json();
        } catch (error) {
            console.error('Error loading posts:', error);
            // Fallback to embedded posts if JSON file not found
            this.posts = this.getErrorPage();
        }
    }
    
    getFallbackPosts() {
        return [
            {
                id: 1,
                title: {
                    en: "Darkest Hour",
                    zh_hk: "黑暗對峙"
                },
                content: {
                    en: "I have, myself, full confidence that if all do their duty, if nothing is neglected, and if the best arrangements are made, as they are being made, we shall prove ourselves once again able to defend our island home, to ride out the storm of oppression, and to outlive the menace of tyranny, if necessary for years, if necessary alone. At any rate, that is what we are going to try to do. That is the resolve of our movement—every man and woman of us. That is the will of our people and our communities. Hong Kong and its allies, linked together in their cause and in their need, will defend to the death their native soil, aiding each other like good comrades to the utmost of their strength. Even though large tracts of our region and many proud towns have fallen or may fall into the grip of the communists and all the odious apparatus of Chinazi rule, we shall not flag or fail. We shall go on to the end, we shall fight in Hong Kong, we shall fight on the streets and in the squares, we shall fight with growing confidence and growing strength in our hearts, we shall defend our city, whatever the cost may be, we shall fight on the barricades, we shall fight on the islands district, we shall fight in the alleys and in the neighborhoods, we shall fight in the hills; we shall never surrender, and even if, which I do not for a moment believe, this city or a large part of it were subjugated and starving, then our diaspora beyond the seas, armed and guarded by the spirit of freedom, would carry on the struggle, until, in God’s good time, the free world, with all its power and might, steps forth to the rescue and the liberation of our home. Glory to Hong Kong.",
                    zh_hk: "我有十足嘅信心，只要人人各盡其職，無一絲疏忽，做好最佳嘅部署，正如我哋而家做緊嘅，我哋一定可以再次證明我哋有能力保衛我哋嘅家園，捱過壓迫嘅風暴，戰勝暴政嘅威脅，哪怕要年復年，哪怕要獨自面對。無論如何，呢個就係我哋要努力做到嘅目標，呢個就係我哋獨立嘅決心，每一位香況人嘅決心，呢個就係我哋人民同社區嘅意志。香港同佢嘅盟友，喺共同目標同理想下連繫起來，將會誓死保衛我哋嘅家園，彼此如戰友般互相支持，用盡全力。縱使我哋嘅大片土地同好多市鎮已經或者可能會落入共慘賤畜同中蟈納粹嘅魔爪，我哋絕不退縮或屈服。我哋會堅持到底，我哋會喺香港戰鬥，我哋會喺街頭同廣場戰鬥，我哋會以越嚟越強嘅信心同力量嘅心黎戰鬥，我哋會保衛我哋嘅城市，無論代價如何，我哋會喺煲底戰鬥，我哋會喺離島戰鬥，我哋會喺小巷同市區戰鬥，我哋會喺山頭戰鬥；我哋永不投降。即使，我一刻都唔相信，呢個城市或者佢嘅大部分被征服同受到飢餓折磨，我哋喺海外嘅同胞，帶住自由嘅精神同武裝，將會繼續鬥爭，直到喺上帝應許嘅時機，自由世界以佢嘅所有力量同實力，企出黎拯救同解放我哋嘅家園。願榮光歸香港。"
                },
                date: "2019-06-12",
                tags: ["HK"]
            }
        ];
    }
    
    initializeTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('coffee-blog-theme') || 'light';
        this.currentTheme = savedTheme;
        this.applyTheme(savedTheme);
    }
    
    initializeLanguage() {
        // Check for saved language preference or default to English
        const savedLang = localStorage.getItem('coffee-blog-lang') || 'en';
        this.currentLang = savedLang;
        this.applyLanguage(savedLang);
    }
    
    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Language toggle
        const langToggle = document.getElementById('langToggle');
        langToggle?.addEventListener('click', () => this.toggleLanguage());
        
        // Tag search
        const tagSearch = document.getElementById('tagSearch');
        tagSearch?.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Clear search
        const clearSearch = document.getElementById('clearSearch');
        clearSearch?.addEventListener('click', () => this.clearSearch());
        
        // Tag click events (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                this.toggleTag(e.target.textContent.trim());
            }
        });
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        localStorage.setItem('coffee-blog-theme', newTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
        }
    }
    
    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'zh_hk' : 'en';
        this.currentLang = newLang;
        this.applyLanguage(newLang);
        localStorage.setItem('coffee-blog-lang', newLang);
    }
    
    applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.body.setAttribute('data-lang', lang);
        
        // Update language toggle button
        const langToggle = document.getElementById('langToggle');
        const toggleText = langToggle?.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = lang === 'en' ? 'EN' : '中';
        }
        
        // Update all text elements with data attributes
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update search placeholder
        const searchInput = document.getElementById('tagSearch');
        if (searchInput) {
            const placeholder = searchInput.getAttribute(`data-${lang}`);
            if (placeholder) {
                searchInput.placeholder = placeholder;
            }
        }
        
        // Re-render posts to update content
        this.renderPosts();
    }
    
    handleSearch(query) {
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.classList.toggle('visible', query.length > 0);
        }
        
        if (query.trim() === '') {
            this.activeTags.clear();
            this.renderPosts();
            this.updateActiveTagsDisplay();
            return;
        }
        
        // Parse tags from query (support multiple tags separated by spaces or commas)
        const tags = query.toLowerCase().split(/[,\s]+/).filter(tag => tag.length > 0);
        this.activeTags = new Set(tags);
        
        this.renderPosts();
        this.updateActiveTagsDisplay();
    }
    
    clearSearch() {
        const searchInput = document.getElementById('tagSearch');
        if (searchInput) {
            searchInput.value = '';
            this.handleSearch('');
        }
    }
    
    toggleTag(tagText) {
        const tag = tagText.toLowerCase().replace(/^#/, '');
        
        if (this.activeTags.has(tag)) {
            this.activeTags.delete(tag);
        } else {
            this.activeTags.add(tag);
        }
        
        // Update search input
        const searchInput = document.getElementById('tagSearch');
        if (searchInput) {
            searchInput.value = Array.from(this.activeTags).join(', ');
        }
        
        this.renderPosts();
        this.updateActiveTagsDisplay();
    }
    
    updateActiveTagsDisplay() {
        const activeTagsSection = document.getElementById('activeTags');
        const activeTagsList = document.getElementById('activeTagsList');
        
        if (this.activeTags.size === 0) {
            activeTagsSection.style.display = 'none';
            activeTagsSection.classList.remove('visible');
            return;
        }
        
        activeTagsSection.style.display = 'block';
        setTimeout(() => activeTagsSection.classList.add('visible'), 10);
        
        activeTagsList.innerHTML = Array.from(this.activeTags).map(tag => 
            `<span class="tag active">#${tag}</span>`
        ).join('');
    }
    
    renderPosts() {
        const container = document.getElementById('postsContainer');
        const noResults = document.getElementById('noResults');
        
        if (!container) return;
        
        let filteredPosts = this.posts;
        
        // Filter posts by active tags
        if (this.activeTags.size > 0) {
            filteredPosts = this.posts.filter(post => 
                Array.from(this.activeTags).some(activeTag =>
                    post.tags.some(postTag => 
                        postTag.toLowerCase().includes(activeTag.toLowerCase())
                    )
                )
            );
        }
        
        if (filteredPosts.length === 0) {
            container.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        container.style.display = 'block';
        noResults.style.display = 'none';
        
        container.innerHTML = filteredPosts.map((post, index) => 
            this.createPostHTML(post, index)
        ).join('');
    }
    
    createPostHTML(post, index) {
        const title = post.title[this.currentLang] || post.title.en;
        const content = post.content[this.currentLang] || post.content.en;
        const formattedDate = this.formatDate(post.date);
        
        return `
            <article class="post" style="animation-delay: ${index * 0.1}s">
                <header class="post-header">
                    <h2 class="post-title">${title}</h2>
                    <div class="post-meta">
                        <span class="post-date">
                            📅 ${formattedDate}
                        </span>
                    </div>
                </header>
                <div class="post-content">
                    ${content.split('\n').map(paragraph => 
                        paragraph.trim() ? `<p>${paragraph}</p>` : ''
                    ).join('')}
                </div>
                <footer class="post-tags">
                    ${post.tags.map(tag => 
                        `<span class="tag ${this.activeTags.has(tag.toLowerCase()) ? 'active' : ''}">#${tag}</span>`
                    ).join('')}
                </footer>
            </article>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        if (this.currentLang === 'zh_hk') {
            return date.toLocaleDateString('zh-HK', options);
        }
        return date.toLocaleDateString('en-US', options);
    }
    
    showError() {
        const container = document.getElementById('postsContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <p>Failed to load blog posts. Please try refreshing the page.</p>
                </div>
            `;
        }
    }
}

// public void static main(String[] args) {
document.addEventListener('DOMContentLoaded', () => {
    new Blog();
}); // Load the fucking blog, I love javascript rendering.

// Add some visual feedback for interactions
document.addEventListener('click', (e) => {
    // Add ripple effect to buttons
    if (e.target.matches('.toggle-btn, .tag')) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
// }