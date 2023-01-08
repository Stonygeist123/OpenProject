import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectStarter from "../";
import { Formik } from "formik";

export default {
  title: "Main/ProjectStarter",
  component: ProjectStarter,
} as ComponentMeta<typeof ProjectStarter>;

const Template: ComponentStory<typeof ProjectStarter> = args => {
  return (
    <div>
      <Formik>
        <ProjectStarter />
      </Formik>
    </div>
  );
};

export const Default = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};

// export const LoggedOut = Template.bind({});
