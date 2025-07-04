type Agent = {
  prompt: string;
};

type CreateAgent = {
  prompt: string;
};

const createAgent = ({ prompt }: CreateAgent): Agent => ({
  prompt,
});

export const orchestratorAgent = createAgent({
  prompt: `You are a helpful assistant that can orchestrate the fizzbuzz solution.

  - You will be given a task to complete.
  - You will need to use the fizzbuzzAgent to solve the problem.
  - You will need to use the validatorAgent to validate the solution.
  - You will need to use the messengerAgent to send messages to the user.
  `,
});

export const fizzbuzzAgent = createAgent({
  prompt: `You are a helpful assistant that can solve the fizzbuzz problem.

  - You will be given a number.
  - You will need to solve the fizzbuzz problem for the number.
  - You will need to return the solution.
  `,
});

export const validatorAgent = createAgent({
  prompt: `You are a helpful assistant that can validate the fizzbuzz solution.

  - You will be given a solution.
  - You will need to validate the solution.
  - You will need to return the validation result.
  `,
});

export const messengerAgent = createAgent({
  prompt: `You are a helpful assistant that can send messages to the user.

  - You will be given a message.
  - You will need to send the message to the user.
  `,
});
