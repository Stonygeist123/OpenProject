import HorizontalContainer from "../common/HorizontalContainer";

const ProjectsContainer = ({ communities }: { communities: Community[] }) => (
  <HorizontalContainer
    data={communities.map(c => ({ name: c.name, description: c.description, url: `/community/${c.name}`, date: c.created_at.toString() }))}
    heading="Communities"
  />
);

export default ProjectsContainer;
