import AddToCart from "./Fragments/AddToCart";
import Counseling from "./Fragments/Counseling";
import MiniProduct from "./Fragments/MiniProduct";
import NoticeDescription from "./Fragments/NoticeDescription";
import Price from "./Fragments/Price";

const Sidebar = ({ name, image, sellers }) => {

  
  return (
    <aside className="col-span-2 w-full rounded-xl border border-neutral-200 max-h-max sticky top-5 p-5 space-y-5">
      <MiniProduct image={image} name={name} />
      <NoticeDescription />
      <Price price={sellers && sellers[0].price} />
      <AddToCart />
      <Counseling />
    </aside>
  );
};

export default Sidebar;
