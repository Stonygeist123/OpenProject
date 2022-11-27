import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateTaskBox from "../CreateTaskBox";

export default {
  title: "Main/CreateTaskBox",
  component: CreateTaskBox,
} as ComponentMeta<typeof CreateTaskBox>;

const Template: ComponentStory<any> = (args: {}) => {
  return (
    <>
      <CreateTaskBox {...args} />
    </>
  );
};

export const Default = Template.bind({});

// export const LoggedOut = Template.bind({});
