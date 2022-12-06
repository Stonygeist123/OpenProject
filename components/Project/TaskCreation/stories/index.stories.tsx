import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskCreation from "../";

export default {
  title: "Main/TaskCreation",
  component: TaskCreation,
} as ComponentMeta<typeof TaskCreation>;

const Template: ComponentStory<typeof TaskCreation> = args => {
  return (
    <div>
      <TaskCreation />
    </div>
  );
};

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};

// export const LoggedOut = Template.bind({});
