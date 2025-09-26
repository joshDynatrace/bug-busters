# Bug Busters Quiz App

A Dynatrace app that tests your debugging skills with an interactive quiz format.

## Description

Bug Busters is a quiz application where users analyze common software bugs and answer multiple-choice questions about their causes and solutions. The app features:

- **Timer-based scoring**: 30-minute countdown timer that contributes to your final score
- **Multiple choice questions**: Questions covering different types of software bugs
- **Scoring system**: 100 points per correct answer + remaining time in seconds
- **User state persistence**: Results are saved using Dynatrace's state service
- **Responsive design**: Built with Strato Design System components

## Quiz Flow

1. **Intro Page**: Users enter their name and email to begin
2. **Question Pages**: 4 bug scenarios with:
   - Bug descriptions
   - Helpful hints
   - Multiple choice questions
3. **Results Page**: Final score display with answer review

## Technical Implementation

- **Frontend**: React with TypeScript
- **UI Components**: Dynatrace Strato Design System
- **Routing**: React Router for navigation
- **State Management**: React Context API
- **Data Storage**: Dynatrace State Service
- **Development**: Dynatrace App Toolkit

## Getting Started

1. Clone and navigate to the project directory
2. Update environmentUrl in app.config.json to point to the tenant you want to use
3. Install dependencies: `npm install`
4. Start development server: `npx dt-app dev`
5. Open in Dynatrace environment or locally at the provided URL

## Configuration

The app requires the following Dynatrace scopes in `app.config.json`:
- `state:user-app-states:write` - Store quiz results
- `state:user-app-states:read` - Read quiz results

## File Structure

```
ui/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # App header with navigation
│   │   └── TimerBar.tsx        # Countdown timer display
│   ├── contexts/
│   │   ├── QuizContext.tsx     # Quiz state management
│   │   └── TimerContext.tsx    # Timer state management
│   ├── data/
│   │   └── quizData.ts         # Quiz questions and answers
│   ├── pages/
│   │   ├── IntroPage.tsx       # User registration form
│   │   ├── QuizPage.tsx        # Question display and answering
│   │   └── ResultsPage.tsx     # Score display and review
│   └── App.tsx                 # Main app component with routing
```

## Customization

Quiz questions can be easily modified by editing `ui/app/data/quizData.ts`. Each question includes:
- Bug description
- Hints array
- Question text
- Multiple choice answers with correct/incorrect flags

## Deployment

1. Deploy to Dynatrace: `npx dt-app deploy` or `npm run deploy`

The app will be available in your Dynatrace environment once deployed.

## Other Available Commands

### `npm run start` or `npx dt-app dev`
Runs the app in development mode with hot reloading.

### `npm run build`
Builds the app for production.

### `npm run deploy` or `npx dt-app deploy`
Builds and deploys the app to the Dynatrace environment.

### `npm run uninstall`
Uninstalls the app from the Dynatrace environment.

## Learn More

- [Dynatrace Developer Documentation](https://developer.dynatrace.com/)
- [Strato Design System](https://developer.dynatrace.com/design/about-strato-design-system/)
- [Dynatrace App Toolkit](https://developer.dynatrace.com/quickstart/app-toolkit/)
