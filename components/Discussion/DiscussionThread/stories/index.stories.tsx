import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import messages from "./messages.json";

import DiscussionThread from "../";

export default {
  title: "Main/DiscussionThread",
  component: DiscussionThread,
} as ComponentMeta<typeof DiscussionThread>;

const Template: ComponentStory<any> = (args: {}) => {
  return (
    <>
      <DiscussionThread {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  messages: messages,
};

// export const LoggedOut = Template.bind({});
