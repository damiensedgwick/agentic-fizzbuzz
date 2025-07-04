# agentic-fizzbuzz

Agentic Fizzbuzz is an old age programming challenge, completely over-engineered
and made a little bit more agentic.

https://github.com/user-attachments/assets/10623570-901e-4862-a4ff-34e8fbcf04eb

## About

At present, the 'agents' are all very dumb, there is no memory or tooling,
there is a simple event bus where events are emitted and different agents will
run depending on the event.

The current flow looks a little bit like this:

<img width="616" alt="Screenshot 2025-07-04 at 15 37 48" src="https://github.com/user-attachments/assets/c188be5c-460c-4c1c-801d-c88515fd3608" />

## TODO

A bit refactor, every agent should report back to the agent manager and it would be
good to give each agent some memory and tools.
