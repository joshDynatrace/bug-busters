--8<-- "snippets/3-codespaces.js"

## Bug 1: Todo App - Clear Completed

Now that you're an expert bug finder from finding bugs in the Bugzapper game, let's look at another app - the Todo App. There are a few bugs in the app that we'll need to investigate.

- Open the Todo app
- Add a few tasks
- Complete some of them by clicking to the left of the task
- Clear the completed tasks

What happens?

<p align="center">
  <img src="img/todo_completed.png" alt="Bugbusters" width="500">
</p>

***Hints***

- Open up the distributed traces app to make sure API calls work as expected and understand which calls were made to the backend
- Open the Live Debugger to set a breakpoint in the the function called when you clear Todos. Use the namespace `todoapp` as your Live Debugger filter.
- Why are the Todo tasks not getting cleared after looking at the code?


## Bug 2: Todo App - Clear Completed

Let's add a todo task with some special characters such as exclamation points.

What do you notice? Where is the bug?

<p align="center">
  <img src="img/todo_app_exclamation.png" alt="Bugbusters" width="500">
</p>

***Hints***

- Use the distributed tracing app to filter traces based on the app name, kubernetes namespace, or workload names to see which services are being called
- Use the Live Debugger to set a breakpoint in the part of the code you found to analyze the data.
- What's happening to the todotitle as it gets added to our list of todos?

<div class="grid cards" markdown>
- [Cleanup:octicons-arrow-right-24:](cleanup.md)
</div>