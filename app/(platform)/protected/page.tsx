"use client";

import { useAuth, useUser } from "@clerk/nextjs";

const ProtectedPage = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  return (
    <div>
      {userId}
      {user?.firstName}
    </div>
  );
};

export default ProtectedPage;
