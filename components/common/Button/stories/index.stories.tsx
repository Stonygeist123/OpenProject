import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../";

export default {
  title: "Main/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => {
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <p style={{ display: "block" }}>small</p>
        <Button {...args} size="s" />
      </div>
      <div style={{ display: "inline-block", marginLeft: "30px" }}>
        <p style={{ display: "block" }}>medium</p>
        <Button {...args} size="m" />
      </div>
      <div style={{ display: "inline-block", marginLeft: "30px" }}>
        <p style={{ display: "block" }}>large</p>
        <Button {...args} size="l" />
      </div>
      <div style={{ display: "inline-block", marginLeft: "30px" }}>
        <p style={{ display: "block" }}>XL</p>
        <Button {...args} size="xl" />
      </div>
      <div style={{ display: "inline-block", marginLeft: "30px" }}>
        <p style={{ display: "block" }}>XXL</p>
        <Button {...args} size="xxl" />
      </div>
    </div>
  );
};

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};

// export const LoggedOut = Template.bind({});
