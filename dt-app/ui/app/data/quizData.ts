export interface QuizQuestion {
  id: number;
  bugHeading: string;
  bugDescription: string;
  hints: string[];
  question: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export const QUIZ_TIMER_INITIAL = 1800; // 30 minutes in seconds
export const POINTS_PER_CORRECT_ANSWER = 100;

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    bugHeading: "Play Bugzappers and Clear the Scores",
    bugDescription: "There are a few bugs in the Bugzapper app and your mission is to find them by investigating the application and using Dynatrace to help your investigation. Open the bugzappers game in your browser (if its not open, go to the codespaces 'Ports' tab and open the app on port 30200 in your browser). To start, play a game to make sure there are some top scores on the scoreboard.",
    hints: [
      "Try to clear the scores from the Top Scores. What do you notice?",
      "Try to use the Distributed Tracing App to understand which API calls are being made. Filter on the asteroids-game service. Press 'ctrl/cmd + K' in Dynatrace and type 'Distributed Tracing' to find the app",
      "Use the Live Debugger to set a breakpoint in the part of the code in 'server.js' that's responsible for clearing the scores. Press 'ctrl/cmd + K' in Dynatrace and type 'Live Debugger' to find the app. Click the purple pencil icon to set a Live Debugger filter. Use the bugzapper namespace as the filter. The source code repository should populate automatically."
    ],
    question: "Why are the top scores not being cleared?",
    answers: [
      {
        id: "a",
        text: "The wrong API is being called",
        isCorrect: false
      },
      {
        id: "b",
        text: "A new array is being created instead of clearing the existing array",
        isCorrect: true
      },
      {
        id: "c",
        text: "The API being called doesn't exist",
        isCorrect: false
      },
      {
        id: "d",
        text: "The top scores are not being stored properly",
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    bugHeading: "Bug in Past Game Stats",
    bugDescription: "Now that you've played a game, you can view your game stats by clicking on the 'View Game Stats' button. Now click on 'Past Game Stats' to view the past game stats. What do you notice?",
    hints: [
      "Try to use the Distributed Tracing App to understand which API calls are being made. Filter on the asteroids-game service.",
      "Go to the Asteroids Game service in the Services app and check out the Logs. Notice there are some failures. Press 'ctrl/cmd + K' in Dynatrace and type 'Services' to find the app.",
      "Based on the error logs, use the Live Debugger to set a breakpoint in the part of the code in 'server.js' that is responsible for storing the game stats when a game ends."
    ],
    question: "Why is the accuracy game stat coming back as null?",
    answers: [
      {
        id: "a",
        text: "The accuracy isn't being calculated on the server",
        isCorrect: false
      },
      {
        id: "b",
        text: "The front end is displaying the accurary data incorrectly",
        isCorrect: false
      },
      {
        id: "c",
        text: "The bullets fired variable being used in the calculation is the wrong one so an exception is thrown",
        isCorrect: true
      },
      {
        id: "d",
        text: "The accurary variable is not being saved",
        isCorrect: false
      }
    ]
  },
  {
    id: 3,
    bugHeading: "Todo App: Clear Completed Tasks",
    bugDescription: "Now that you're an expert bug finder from finding bugs in the Bugzapper game, let's look at another app - the Todo App. There are a few bugs in the app that we'll need to investigate. Open the Todo app and add a few tasks. Complete some of them by clicking to the left of the task and then Clear the completed tasks. What happens?",
    hints: [
      "Open up the distributed traces app to make sure API calls work as expected and understand which calls were made to the backend. Press 'ctrl/cmd + K' in Dynatrace and type 'Distributed Tracing' to find the app.",
      "Open the Live Debugger to set a breakpoint in the the function called when you clear Todos. Press 'ctrl/cmd + K' in Dynatrace and type 'Live Debugger' to find the app. Click the purple pencil icon to set a Live Debugger filter. Use the namespace todoapp as your Live Debugger filter.",
      "Why are the Todo tasks not getting cleared after looking at the code?"
    ],
    question: "Why are the Todo tasks not getting cleared?",
    answers: [
      {
        id: "a",
        text: "The Todo task are not actually being saved on the server",
        isCorrect: false
      },
      {
        id: "b",
        text: "A clear completed todo function was never implemented",
        isCorrect: false
      },
      {
        id: "c",
        text: "There is an exception being thrown when trying to clear the Todo tasks",
        isCorrect: false
      },
      {
        id: "d",
        text: "We are clearing Todo's from a newly instantiated variable on accident",
        isCorrect: true
      }
    ]
  },
  {
    id: 4,
    bugHeading: "Todo App: Issue with Special Characters",
    bugDescription: "Let's add a todo task with some special characters such as exclamation points. What do you notice? Where is the bug?",
    hints: [
      "Use the distributed tracing app to filter traces based on the app name, kubernetes namespace, or workload names to see which services are being called. Press 'ctrl/cmd + K' in Dynatrace and type 'Distributed Tracing' to find the app.",
      "Use the Live Debugger to set a breakpoint in the part of the code you found to analyze the data. Press 'ctrl/cmd + K' in Dynatrace and type 'Live Debugger' to find the app. Click the purple pencil icon to set a Live Debugger filter. Use the namespace todoapp as your Live Debugger filter.",
      "What's happening to the todotitle as it gets added to our list of todos?"
    ],
    question: "Why are special characters being removed when saving the Todo task?",
    answers: [
      {
        id: "a",
        text: "There is a replaceAll string function that's stripping them out",
        isCorrect: true
      },
      {
        id: "b",
        text: "The todo item is being concatenated and shortened in the server logic",
        isCorrect: false
      },
      {
        id: "c",
        text: "The special characters are actually not being removed",
        isCorrect: false
      },
      {
        id: "d",
        text: "The correct Todo title is not being sent to the addTodo function on the server",
        isCorrect: false
      }
    ]
  }
];
