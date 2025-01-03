# Flick: Your Personalized News and Content Creator

Effortlessly create and share personalized content across multiple platforms. With Flick, stay updated on the latest news tailored to your interests and leverage AI-powered tools to generate high-quality content.

![image](https://github.com/user-attachments/assets/972dc405-cb7f-4066-923d-73f3aca2580e)

## Features

### 1. Personalized News Feed
- Stay informed with news articles tailored to your interests.
- Articles are scraped and categorized from trusted sources like Vogue, BBC News, and AP News using a custom news scraper.
![image](https://github.com/user-attachments/assets/2352fd05-f653-4ea7-8755-96d301390ebc)

### 2. AI-Powered Content Creation
- Generate high-quality posts in seconds with GROQ AI.
- Auto-fill filters like:
  - Type of post
  - Word count
  - Platform-specific format
  - Tone
  - Emojis
- Includes a custom post creation option for complete flexibility.
![image](https://github.com/user-attachments/assets/f752d8d7-079f-4bbc-a3b5-cc0ff7d3a3bd)

### 3. Multi-Platform Sharing
- Seamlessly share your thoughts across multiple platforms directly from Flick.

### 4. Dashboard Management
- View, edit, save, delete, and share all generated posts.
![image](https://github.com/user-attachments/assets/e1f24762-153d-401d-b595-67ecf532041d)

## Technologies Used

- **React**: Frontend framework for a responsive user interface.
- **Firebase**:
  - Authentication for secure user sign-in.
  - Real-time database to store and manage user-generated content.
- **GROQ AI**: For AI-based content generation.
- **Custom News Scraper**: A Python-based tool to fetch and classify news articles from Vogue, BBC News, and AP News. Repository: [News Scraper](https://github.com/GayathriPCh/news-scraper)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flick.git
   cd flick
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Add your Firebase configuration. 

4. Start the development server:
   ```bash
   npm start
   ```

5. Configure GROQ AI API for content generation.

## Usage

1. **Sign In**: Use Firebase Authentication to create an account or sign in.
2. **Explore News**: View personalized news articles based on your preferences.
3. **Generate Posts**: Create content using AI with pre-filled filters or custom settings.
4. **Manage Content**: Use the dashboard to manage your posts.
5. **Share**: Publish your content across multiple platforms.

## News Scraper Integration

Flick integrates with the [News Scraper](https://github.com/GayathriPCh/news-scraper), which:
- Fetches articles from Vogue, BBC News, and AP News.
- Classifies them using a zero-shot classification model into categories such as business, fashion, and entertainment.
- Outputs categorized articles in JSON format for seamless integration with Flick.

## Future Roadmap

- Add more customization options for content generation.
- Support for additional news sources and platforms.
- Enhanced analytics for post-performance tracking.
- Mobile application for on-the-go content creation.
