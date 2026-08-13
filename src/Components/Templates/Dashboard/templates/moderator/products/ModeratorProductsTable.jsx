import Table from "../../../common/Table";
import TableCell from "../../../common/Table/TableCell";
import TableRow from "../../../common/Table/TableRow";

import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import ProductDrawer from "../../../common/ProductDrawer";
import TableBody from "../../../common/Table/TableBody";
import TableHead from "../../../common/Table/TableHead";
import TableToolbar from "../../../common/Table/TableToolbar";

const ModeratorProductsTable = () => {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const toggleDrawer = () => setIsDrawerShow((prev) => !prev);

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2 className="font-black text-lg text-zinc-800">تمامی محصولات</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد محصول</span>
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="">
            <TableCell>شناسه</TableCell>
            <TableCell>عنوان</TableCell>
            <TableCell>مبلغ</TableCell>
            <TableCell>وضعیت</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="text-zinc-600 *:h-16! font-medium text-xs!">
          <TableRow>
            <TableCell>12</TableCell>
            <TableCell>مک‌‌بوک ۲۰۲۵</TableCell>
            <TableCell>{400_000_000} تومان</TableCell>
            <TableCell>فعال</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ProductDrawer isOpen={isDrawerShow} onToggle={toggleDrawer} />
    </>
  );
};

export default ModeratorProductsTable;
