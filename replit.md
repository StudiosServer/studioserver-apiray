# Overview

Studio Server API is a comprehensive REST API service that provides access to anime content, music streaming, AI services, and various utility tools. The application serves as a multimedia content aggregation platform with endpoints for anime searches, image generation, audio processing, and general-purpose utilities. Built with Node.js and Express, it acts as a middleware layer that integrates multiple third-party services while providing a unified API interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture
- **Framework**: Express.js with Node.js runtime
- **Server Configuration**: Single entry point via `server.js` with modular route structure
- **Process Management**: PM2 ecosystem configuration for production deployment
- **Development Tools**: Nodemon for hot-reloading during development

## Route Organization
- **Modular Routing**: Routes organized by feature domains (anime, search, tools, etc.)
- **Static File Serving**: Public directory serves HTML pages, CSS, JavaScript, and assets
- **Web Routes**: Separate routing modules in `/web` directory for page rendering
- **API Routes**: Feature-specific routes in `/routes` directory with subdirectories for different services

## Frontend Architecture
- **Static HTML Pages**: Individual HTML files for different sections (anime, download, search, etc.)
- **Client-Side Effects**: JavaScript-based text glitch animations and interactive elements
- **Responsive Design**: CSS grid system and Bootstrap icons for consistent UI
- **Progressive Enhancement**: jQuery integration for enhanced user interactions

## External Service Integration
- **Anime Services**: Integration with multiple anime APIs (nhentai, anime databases, image providers)
- **Media Processing**: Puppeteer for web scraping and dynamic content extraction
- **Image Handling**: Sharp library for image processing and manipulation
- **Email Services**: Nodemailer integration for contact form functionality

## Authentication & API Management
- **API Key System**: Simple API key validation for premium endpoints
- **Rate Limiting**: Basic usage tracking through external counter service
- **Session Management**: Express-session middleware for user state management

## Data Flow
- **Request Processing**: Middleware chain handles body parsing, session management, and authentication
- **Response Modification**: Consistent response format with creator branding and status indicators
- **Error Handling**: Structured error responses with fallback to development status messages
- **File Management**: Temporary file storage for processed images and media content

## Deployment Strategy
- **Multi-Platform Support**: Vercel configuration for serverless deployment
- **Container Ready**: PM2 ecosystem for traditional server deployment
- **Environment Variables**: Configuration management through environment-based commands

# External Dependencies

## Third-Party APIs
- **Delirius API**: Primary anime content provider for searches, information, and images
- **Nekos.life**: Anime character image generation service
- **LoliAPI**: Anime wallpaper and character image provider
- **Studio Server Counter**: Usage tracking and analytics service

## Media & Content Services
- **Spotify API**: Music search and metadata retrieval (Client ID: configured)
- **YouTube API**: Video search and content discovery (API Key: configured)
- **Google Gemini AI**: AI-powered content generation and processing (API Key: configured)

## Development & Processing Tools
- **Puppeteer**: Headless browser for web scraping and dynamic content extraction
- **Sharp**: High-performance image processing library
- **Cheerio**: Server-side HTML parsing and manipulation
- **JSDOM**: DOM manipulation for server-side rendering

## Communication Services
- **Nodemailer**: Email service integration for contact forms and notifications
- **Socket.io**: Real-time communication capabilities for interactive features

## Utility Libraries
- **Axios**: HTTP client for external API communications
- **Formidable**: File upload handling and processing
- **Node-fetch**: Additional HTTP request capabilities
- **Progress**: Progress tracking for long-running operations

## Font and UI Resources
- **Font Awesome**: Icon library for UI elements
- **Bootstrap Icons**: Additional icon set for interface components
- **Google Fonts**: Share Tech Mono font for consistent typography
- **Custom CSS**: Grid system and utility classes for responsive design