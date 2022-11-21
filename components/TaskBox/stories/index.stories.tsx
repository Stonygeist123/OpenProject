import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskBox from "../TaskBox";

export default {
  title: "Main/TaskBox",
  component: TaskBox,
} as ComponentMeta<typeof TaskBox>;

const Template: ComponentStory<typeof TaskBox> = args => {
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <TaskBox {...args} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});

// export const LoggedOut = Template.bind({});
