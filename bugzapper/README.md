# Bugzapper - Classic Asteroids Game

A classic Asteroids-style space shooter game built with HTML5 Canvas, JavaScript, and a Node.js/Express backend. This game is designed as part of the Bug Busters workshop to demonstrate common web application bugs and debugging techniques.

## 🎮 Game Features

- **Classic Asteroids Gameplay**: Control a spaceship, destroy asteroids, and survive as long as possible
- **Progressive Difficulty**: Levels increase as you destroy more asteroids
- **Scoring System**: Earn points for destroying asteroids and surviving
- **Player Statistics**: Track bullets fired, accuracy, level reached, and play time
- **Leaderboard**: Top 10 high scores with persistent storage
- **Responsive Controls**: Smooth ship movement and shooting mechanics

## 🛠 Technology Stack

- **Frontend**: HTML5 Canvas, JavaScript ES6, CSS3
- **Backend**: Node.js with Express.js
- **Storage**: In-memory data storage (scores and player statistics)
- **Architecture**: RESTful API with JSON responses

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to the bugzapper directory**:
   ```bash
   cd bugzapper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🎯 How to Play

### Controls
- **↑ Arrow Key**: Thrust forward
- **← → Arrow Keys**: Rotate ship left/right  
- **Spacebar**: Shoot bullets
- **P Key**: Pause/unpause game

### Objective
- Destroy asteroids to earn points
- Avoid colliding with asteroids
- Survive as long as possible
- Beat the high score!

## 🔧 API Endpoints

### Scores
- `GET /api/scores` - Retrieve top 10 scores
- `POST /api/scores` - Submit a new score
- `GET /api/clearScores` - Clear all scores

### Player Statistics  
- `GET /api/playerStats` - Get recent player statistics
- `POST /api/playerStats` - Submit game statistics

## 📁 Project Structure

```
bugzapper/
├── server.js              # Express server and API endpoints
├── package.json           # Dependencies and scripts
├── public/
│   ├── index.html         # Game HTML structure
│   ├── game.js           # Game engine and logic
│   ├── styles.css        # Game styling
│   └── images/
│       └── bug.png       # Game assets
```

### Code Structure
- **Game Engine**: Canvas-based rendering with game loop
- **Physics**: Basic collision detection and movement
- **State Management**: Game states (menu, playing, paused, game over)
- **API Integration**: RESTful communication with backend

## 📊 Game Statistics Tracked

- **Bullets Fired**: Total shots taken
- **Asteroids Destroyed**: Successful hits
- **Accuracy**: Percentage of successful shots
- **Level Reached**: Highest level achieved
- **Time Played**: Duration of game session
- **Final Score**: Points earned

## 🎨 Customization

The game can be customized by modifying:
- **Game constants** in `game.js` (speed, lives, scoring)
- **Visual styling** in `styles.css`
- **Server configuration** in `server.js` (port, data limits)

## 🔍 Building Docker Image

Example:

```
docker buildx build --platform linux/amd64,linux/arm64 -t jhendrick/bugzapper-game:latest . --push
```
