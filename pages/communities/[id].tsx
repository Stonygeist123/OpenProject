import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CommunityPagesetCommunityNotFound = () => {
  const router = useRouter();
  const { id } = router.query;
  const [communityFound, setCommunityNotFound] = useState(false);
  //   const [projectData, setProjectData] = useState();

  const verifyId = async (id: string | string[] | undefined) => {
    // verify id here
    if (id === "1") {
      return { success: true, community: {} };
    } else {
      return { success: false, community: {} };
    }
  };

  const getCommunity = async () => {
    console.log("getting community");
    const result = await verifyId(id);
    console.log("community found");
    setCommunityNotFound(result.success);
  };

  useEffect(() => {
    if (!router.isReady) return;
    console.log(id);
    getCommunity();
  }, [router.isReady, communityFound]);

  return communityFound ? (
    <p style={{ color: "white" }}>This page is for a community with the id: {id}</p>
  ) : (
    <p style={{ color: "white" }}>Community with id {id} not found</p>
  );
};

export default CommunityPagesetCommunityNotFound;
