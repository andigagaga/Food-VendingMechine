import "../App.css";
import { TFoods } from "../type";
import Lottie from "lottie-react";
import addButton from "../assets/add-icon.json";
import minButton from "../assets/min-icon.json";

interface ProductCardProps {
  product: TFoods;
  onPurchase: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  disabled: boolean;
}

export default function ProductCard({
  product,
  onPurchase,
  onDecreaseQuantity,
  disabled,
}: ProductCardProps) {
  const handlePurchase = () => {
    if (product.stock > 0) {
      onPurchase(product.id);
    } else {
      console.log("product habis");
    }
  };

  const handleDecreaseQuantity = () => {
    onDecreaseQuantity(product.id);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-black flex gap-7 items-center">
        {product.stock > 0 ? (
          <>
            <img src={product.image} alt="" className="w-8 h-8" />
            <p className="text-black font-bold text-xs">{product.name}</p>
            <p className="bg-blue-900 p-1 w-28 flex justify-center rounded-full text-white text-xs">
              Rp {product.price}
            </p>
            <button
              className="stext-white rounded-full w-8"
              onClick={handleDecreaseQuantity}
            >
              <Lottie animationData={minButton} />
            </button>
            <button
              className="bg-green-800 text-white rounded-full w-8"
              onClick={handlePurchase}
              disabled={disabled}
            >
              <Lottie animationData={addButton} />
            </button>
          </>
        ) : (
          <p className="text-red-700">Stock Habis</p>
        )}
      </div>
    </div>
  );
}
