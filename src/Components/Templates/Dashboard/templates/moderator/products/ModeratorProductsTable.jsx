import Table from "../../../common/Table";
import TableCell from "../../../common/Table/TableCell";
import TableRow from "../../../common/Table/TableRow";

import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useProducts } from "../../../../../../lib/Hooks/useProducts";
import ProductDrawer from "../../../common/ProductDrawer";
import TableBody from "../../../common/Table/TableBody";
import TableHead from "../../../common/Table/TableHead";
import TableToolbar from "../../../common/Table/TableToolbar";
import {
  formatPrice,
  getDisplayPrice,
} from "./../../../../../../lib/helpers/price";

const ModeratorProductsTable = () => {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const toggleDrawer = () => setIsDrawerShow((prev) => !prev);

  const { products, pagination, page, setPage, isLoading, error } =
    useProducts();

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
                {error || "خطا در دریافت محصولات"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && products.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400">
                هنوز محصولی ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && products.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400">
                هنوز محصولی ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            products.map((product) => {
              const { price, hasMultipleSellers } = getDisplayPrice(
                product.sellers,
              );

              return (
                <TableRow key={product._id}>
                  <TableCell>{product.shortIdentifier}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <>
                      {formatPrice(price)} تومان{" "}
                      {hasMultipleSellers && "(بیش از یک فروشنده)"}
                    </>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {isDrawerShow && (
        <ProductDrawer isOpen={isDrawerShow} onToggle={toggleDrawer} />
      )}
    </>
  );
};

export default ModeratorProductsTable;
