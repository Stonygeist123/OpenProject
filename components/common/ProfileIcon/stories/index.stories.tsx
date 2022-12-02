import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileIcon from "../ProfileIcon";

export default {
  title: "Main/ProfileIcon",
  component: ProfileIcon,
} as ComponentMeta<typeof ProfileIcon>;

const Template: ComponentStory<typeof ProfileIcon> = args => {
  return (
    <div>
      <ProfileIcon {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
export const XSmall = Template.bind({});
XSmall.args = {
  size: "xs",
};
export const Small = Template.bind({});
Small.args = {
  size: "s",
};
export const Medium = Template.bind({});
Medium.args = {
  size: "m",
};
export const Large = Template.bind({});
Large.args = {
  size: "l",
};

// export const LoggedOut = Template.bind({});
