import Variant from "./Variant";

const ProductVariants = ({ fields }) => {
  return (
    <div className="space-y-3">
      <p className="text-xs font-black text-slate-600">ویژگی‌ها:</p>

      <div className="grid grid-cols-3 gap-1.5">
        {Object.entries(fields || {}).map(([name, value], index) => (
          <Variant key={index} name={name} value={value} />
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
