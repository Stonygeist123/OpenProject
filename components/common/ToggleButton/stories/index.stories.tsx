import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ToggleButton from "../ToggleButton";

export default {
  title: "Main/ToggleButton",
  component: ToggleButton,
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = args => {
  return (
    <div>
      <ToggleButton {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = { text: "hello" };

// export const LoggedOut = Template.bind({});
