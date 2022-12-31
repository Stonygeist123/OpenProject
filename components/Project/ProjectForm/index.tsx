import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProjectForm from "../";

export default {
  title: "Main/ProjectForm",
  component: ProjectForm,
} as ComponentMeta<typeof ProjectForm>;

const Template: ComponentStory<typeof ProjectForm> = args => {
  return (
    <div>
      <ProjectForm />
    </div>
  );
};

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};

// export const LoggedOut = Template.bind({});
