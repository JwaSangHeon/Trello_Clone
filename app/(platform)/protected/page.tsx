import { auth, currentUser } from "@clerk/nextjs";

const ProtectedPage = async () => {
  const user = await currentUser();
  const { userId } = auth();
  return (
    <div>
      {user?.firstName}
      {userId}
    </div>
  );
};

export default ProtectedPage;
