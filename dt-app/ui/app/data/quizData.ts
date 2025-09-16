export interface QuizQuestion {
  id: number;
  bugHeading: string;
  bugDescription: string;
  hints: {
    text: string;
    bullets: string[];
  }[];
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
    bugHeading: "Why are the top scores not being cleared?",
    bugDescription: "There are a few bugs in the Bugzapper app and your mission is to find them by interacting with the application and using Dynatrace to help your investigation. <br/><br/> 🎮 Let's play <a href='{{BUGZAPPER_URL}}' target='_blank'>Bugzappers</a>! <br/><br/>Open the Bugzappers app. Play it once. <strong>Click Submit Your Score</strong>.<br/><br/>Try to <strong>Clear the scores</strong>. Now let's troubleshoot!",
    hints: [
      {
        text: "Try to use Distributed Tracing app to understand which API calls are being made.",
        bullets: [
          "Filter on 'Service=asteroids-game'",
          "Which API calls are made?"
        ]
      },
      {
        text: "Try to use Live Debugger app.",
        bullets: [
          "Click the purple pencil icon to set a filter - 'namespace=bugzappers'. The source code repository should populate automatically.",
          "Set the breakpoint in server.js code, where clearing the scores is implemented.",
          "Try to 'CLEAR THE SCORES' in the app few more times.",
          "Wait for data to show up in the Live Debugger screen. Troubleshoot!"
        ]
      }
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
    bugHeading: "What exception is being thrown when the past game stats are being updated?",
    bugDescription: "Now that you've played a game, you can view your game stats by clicking on the <strong>View Game Stats</strong> button.<br/><br/>Click on <strong>Past Game Stats</strong> to view the past game stats.<br/><br/>Notice the accurary is showing as null. Why is that happening?",
    hints: [
      {
        text: "Go to the Asteroids Game service in the Services app and check out the Logs.",
        bullets: [
          "Look for errors in the logs",
          "Press 'Ctrl/Cmd + K' in Dynatrace and type 'Services' to find the app"
        ]
      }
    ],
    question: "What exception is being thrown when the past game stats are being updated?",
    answers: [
      {
        id: "a",
        text: "An ArrayOutofBoundsException",
        isCorrect: false
      },
      {
        id: "b",
        text: "A FileNotFoundException",
        isCorrect: false
      },
      {
        id: "c",
        text: "A NoSuchMethodException",
        isCorrect: false
      },
      {
        id: "d",
        text: "A Divide By Zero Exception",
        isCorrect: true
      }
    ]
  },  
  {
    id: 3,
    bugHeading: "Why are the past game stats not showing up correctly?",
    bugDescription: "Now that we know an exception was being thrown let's find out why the past game stats were null and where in the code this was happening.",
    hints: [
      {
        text: "Try to use Distributed Tracing app to understand which API calls are being made when you click Past Game Stats.",
        bullets: [
          "Filter on 'Service=asteroids-game'"
        ]
      },
      {
        text: "Use the Live Debugger to set a non-breaking breakpoint.",
        bullets: [
          "Based on the error logs, set a breakpoint in the part of the code in 'server.js' that is responsible for storing the game stats when a game ends"
        ]
      }
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
    id: 4,
    bugHeading: "TODO App: Clear Completed Tasks",
    bugDescription: "Now that you're an expert bug finder from finding bugs in the Bugzapper game, let's look at another app - the TODO App. There are a few bugs in the app that we'll need to investigate.<br/><br/>✅ Open the <a href='{{TODO_URL}}' target='_blank'>TODO app</a>.<br/><br/>Add a few tasks (hit enter to add).<br/>Complete some of them by clicking to the left of the task.<br/>Clear the completed tasks. What happens?<br/>Why are the TODO tasks not being cleared?",
    hints: [
      {
        text: "Open up the distributed traces app to find out which API calls are being made to the backend.",
        bullets: [
          "Filter on 'Kubernetes Namespace=todoapp'",
          "Which API calls are made?"
        ]
      },
      {
        text: "Try to use the Live Debugger app.",
        bullets: [
          "Click the purple pencil icon to set a filter - 'namespace=todoapp'. The source code repository should populate automatically.",
          "Set the breakpoint in the function that is called when you clear TODOs.",
          "Try to 'Clear the TODOS' in the app a few more times.",
          "Wait for data to show up in the Live Debugger screen. Troubleshoot!"
        ]
      }
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
    id: 5,
    bugHeading: "Todo App: Issue with Special Characters",
    bugDescription: "Let's add a todo task with some special characters such as exclamation points.<br/><br/>What do you notice? Where is the bug?",
    hints: [
      {
        text: "Open up the distributed traces app to find out which API calls are being made to the backend.",
        bullets: [
          "Filter on 'Kubernetes Namespace=todoapp'",
          "Which API calls are made?"
        ]
      },
      {
        text: "Try to use the Live Debugger app.",
        bullets: [
          "Click the purple pencil icon to set a filter - 'namespace=todoapp'. The source code repository should populate automatically.",
          "Set the breakpoint in the function that is called when you clear TODOs.",
          "Try to 'Clear the TODOS' in the app a few more times.",
          "Wait for data to show up in the Live Debugger screen. Troubleshoot!"
        ]
      }
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
        text: "The special characters are being removed correctly",
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
