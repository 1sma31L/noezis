import ProfilePosts from "@/components/ProfilePosts";

async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <ProfilePosts username={username} />;
}

export default UserProfile;
