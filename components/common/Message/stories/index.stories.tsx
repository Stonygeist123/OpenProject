import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Message from "../Message";

export default {
  title: "Main/Message",
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = args => {
  return (
    <div>
      <Message {...args} />
    </div>
  );
};

export const Default = Template.bind({});

// export const LoggedOut = Template.bind({});
