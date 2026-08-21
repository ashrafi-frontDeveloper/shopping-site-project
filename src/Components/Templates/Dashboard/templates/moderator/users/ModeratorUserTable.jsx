import { BiPencil, BiTrash } from "react-icons/bi";
import { toPersianDate } from "../../../../../../lib/helpers/date";
import { useUsers } from "../../../../../../lib/Hooks/useUsers";
import Table from "../../../common/Table";
import TableBody from "../../../common/Table/TableBody";
import TableCell from "../../../common/Table/TableCell";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableToolbar from "../../../common/Table/TableToolbar";

// Mapping
const roleLabels = {
  USER: "کاربر",
  ADMIN: "مدیر",
  SELLER: "فروشنده",
};

const ModeratorUserTable = () => {
  const { users, isLoading, error, pagination, setPage, refetch } =
    useUsers(10);

  console.log(users);

  return (
    <Table>
      <TableToolbar useFlexBetween>
        <div>
          <h2 className="font-black text-lg text-zinc-800">تمامی کاربران</h2>
        </div>
      </TableToolbar>

      <TableHead>
        <TableRow className="">
          <TableCell>نام</TableCell>
          <TableCell>نقش</TableCell>
          <TableCell>شماره تماس</TableCell>
          <TableCell>آدرس</TableCell>
          <TableCell>کد ملی</TableCell>
          <TableCell>تاریخ ثبت نام</TableCell>
          <TableCell>عملیات</TableCell>
        </TableRow>
      </TableHead>

      <TableBody className="text-zinc-600 *:h-16! font-medium text-xs!">
        {isLoading && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-zinc-400">
              در حال بارگزاری ...
            </TableCell>
          </TableRow>
        )}

        {!isLoading && error && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-500">
              {error || "خطا در دریافت کاربران"}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !error && users.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-zinc-400">
              کاربری وجود ندارد.{" "}
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          !error &&
          users.map((user) => {
            return (
              <TableRow key={user._id}>
                <TableCell>{user.name || "ثبت نشده"}</TableCell>
                <TableCell>
                  {user.roles.map((role) => roleLabels[role]).join(" - ")}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.addresses[0] || "ثبت نشده"}</TableCell>
                <TableCell>{user.nationalCode || "ثبت نشده"}</TableCell>
                <TableCell>{toPersianDate(user.createdAt)}</TableCell>

                <TableCell>
                  <button
                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-md"
                    title="ویرایش"
                  >
                    <BiPencil />
                  </button>

                  <button
                    className="text-red-500 hover:bg-blue-50 p-2 rounded-md"
                    title="بن"
                    // onClick={() => setDeletingProduct(product)}
                  >
                    <BiTrash />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ModeratorUserTable;
