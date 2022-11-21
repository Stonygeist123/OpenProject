import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MessageBox from "../MessageBox";

export default {
  title: "Main/MessageBox",
  component: MessageBox,
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<typeof MessageBox> = args => {
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <MessageBox {...args} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  message:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia labore officiis esse porro enim dolorum asperiores vel ea excepturi omnis eos praesentium, alias adipisci ut dolorem. Fuga, at? Voluptas.",
};

// export const LoggedOut = Template.bind({});
