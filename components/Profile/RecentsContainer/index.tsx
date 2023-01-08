import HorizontalContainer from "../common/HorizontalContainer";

const RecentsContainer = ({ recents }: { recents: { name: string; description: string; url: string; date: string }[] }) => {
  return (
    <HorizontalContainer
      heading="Recents"
      data={recents}
    />
  );
};

export default RecentsContainer;
