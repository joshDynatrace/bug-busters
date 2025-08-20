--8<-- "snippets/getting-started.js"
--8<-- "snippets/grail-requirements.md"

## Bug 1: Play and Game and Clear the Scores
There are a few bugs in the Bugzapper app and your mission is to find them by investaging the application and using Dynatrace to help your investigation.

To start, play a game to make sure there are some top scores on the scoreboard:

<p align="center">
  <img src="img/bugzapper-start.png" alt="Bugbusters" width="500">
</p>

**Hints**

- Try to clear the scores from the Top Scores. What do you notice?
- Try to use the Distributed Tracing App to understand which API calls are being made. Filter on the `asteroids-game` service.
<p align="center">
<img src="img/bugzapper-service.png" alt="Bugbusters" height="400">
</p>
- Use the Live Debugger to set a breakpoint in the part of the code that is responsible for clearing the scores

## Bug 2: View Past Game Stats
Now that you've played a game, you can view your game stats by clicking on the `View Game Stats` button.

<p align="center">
<img src="img/bugzapper-game-stats.png" alt="Bugbusters" height="400">
</p>

Now click on `Past Game Stats` to view the past game stats. What do you notice?

- Try to use the Distributed Tracing App to understand which API calls are being made. Filter on the `asteroids-game` service.
- Go to the Asteroids Game service in the `Services` app and check out the Logs. Notice there are some failures.
- Based on the error logs, use the Live Debugger to set a breakpoint in the part of the code that is responsible for storing the game stats when a game ends.


<br>
<div class="grid cards" markdown>
- [Let's Find More Bugs in the Todo App:octicons-arrow-right-24:](2-todoapp-bugs.md)
</div>
