import Image from "next/image";

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="card-container">
      <header>
        <Image
          src={user.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"}
          alt={"profile-icon"}
          width={100}
          height={100}
        />
      </header>
      <h1 className="font-bold">{user.name}</h1>
      <div className="social-container">
        <div>
          <h1 className="text-xl font-bold">139</h1>
          <h2 className="text-md">Followers</h2>
        </div>
        <div>
          <h1 className="text-xl font-bold">30</h1>
          <h2 className="text-md">Projects</h2>
        </div>
        <div>
          <h1 className="bold-text">10</h1>
          <h2 className="text-md">Communities</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
