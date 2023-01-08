import HorizontalContainer from "../common/HorizontalContainer";

const ProjectsContainer = ({ projects }: { projects: Project[] }) => (
  <HorizontalContainer
    data={projects.map(p => ({ name: p.name, description: p.description, url: `/project/${p.id}`, date: p.created_at.toString() }))}
    heading="Projects"
  />
);

export default ProjectsContainer;
