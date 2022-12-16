import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import messages from "./messages.json";
import MessageBox from "..";

export default {
  title: "Main/MessageBox",
  component: MessageBox,
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<any> = args => {
  return (
    <>
      <MessageBox
        isFirst
        {...args}
      />
      <br />
      <MessageBox {...args} />
      <br />
      <MessageBox
        isLast
        {...args}
      />
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  message: messages[0],
  key: 1,
};

// export const LoggedOut = Template.bind({});
