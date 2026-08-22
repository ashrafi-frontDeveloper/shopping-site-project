import { useState } from "react";
import { TbCategory, TbChevronLeft } from "react-icons/tb";
import { Link } from "react-router";
import useCategories from "./../../../../lib/Hooks/useCategories";

const CategoryMegaMenu = () => {
  const { categories, isLoading } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => {
    setIsOpen(true);

    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  };

  return (
    <div
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className="relative!"
    >
      <button className="flex! items-center! gap-1! text-shadow-teal-800 font-medium">
        <TbCategory />
        <span>دسته‌بندی کالاها</span>
      </button>

      {isOpen && !isLoading && categories.length > 0 && (
        <div className="absolute! top-full! right-0! pt-2! z-50! w-screen! max-w-5xl!">
          <div className="flex! items-stretch! bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden max-h-[70vh]!">
            <ul className="flex! flex-col! gap-0! w-56! shrink-0! border-l border-slate-100 py-3! overflow-y-auto!">
              {categories.map((category) => (
                <>
                  <li
                    onMouseEnter={() => setActiveCategory(category)}
                    key={category._id}
                  >
                    <Link className="flex! items-center! justify-between! gap-2! px-4! py-2.5! text-sm transition-colors">
                      <span>{category.title}</span>
                      <TbChevronLeft className="text-xs opacity-50" />
                    </Link>
                  </li>
                </>
              ))}
            </ul>

            {/* Left */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMegaMenu;
