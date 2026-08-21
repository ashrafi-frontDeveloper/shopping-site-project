import ModeratorUserTable from "../../../../Components/Templates/Dashboard/templates/moderator/users/ModeratorUserTable";
import PageLabel from "../../../../Components/Templates/Dashboard/ui/PageLabel";

const ModeratorUsers = () => {
  return (
    <div className="space-y-10">
      <PageLabel label="مدیریت کاربران فروشگاه" />
      <ModeratorUserTable />
    </div>
  );
};

export default ModeratorUsers;
