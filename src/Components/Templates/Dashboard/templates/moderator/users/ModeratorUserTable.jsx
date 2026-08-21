import { useUsers } from "../../../../../../lib/Hooks/useUsers";

const ModeratorUserTable = () => {
  const { users } = useUsers(10);

  console.log(users);

  return <div>ModeratorUserTable</div>;
};

export default ModeratorUserTable;
