import Lottie from "lottie-react";
import { useState } from "react";
import "../App.css";
import addButton from "../assets/add-icon.json";
import minButton from "../assets/min-icon.json";

interface TProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: TProduct;
  onPurchase: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  disable: boolean;
}

export default function ProductCard({
  product,
  onPurchase,
  onDecreaseQuantity,
}: ProductCardProps) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const handlePurchase = () => {
    if (product.stock > 0) {
      setIsAddClicked(true);
      onPurchase(product.id);
    } else {
      alert("Stok Produk Habis");
    }
  };

  const handleDecreaseQuantity = () => {
    onDecreaseQuantity(product.id);
  };

  return (
    <div className="product container bg-transparent">
      {product.stock > 0 ? (
        <div
        key={product.id}
        className="flex gap-4 items-center justify-between"
      >
        <div className="name text-green-800 flex items-center gap-10">
          <div>

          <img
            src={product.image}
            alt=""
            className="w-10 h-10 rounded-full mr-2"
          />{" "}
          <span className="text-base sm:text-lg">{product.name}</span>
          </div>
        <div className="price name text-orange-700">
          Harga : Rp{" "}
          <span className="text-base sm:text-lg">{product.price}</span>
        </div>
        </div>
        <div>
          {isAddClicked && (
            <button onClick={handleDecreaseQuantity} className="buy-button">
              <p className="w-8">
                <Lottie animationData={minButton} />
              </p>
            </button>
          )}
          <button onClick={handlePurchase} className="buy-button">
            <p className="w-8">
              <Lottie animationData={addButton} />
            </p>
          </button>
        </div>
      </div>
      
      ) : (
        <div className="text-red-700 font-semibold">PRODUCT HABIS !</div>
      )}
    </div>
  );
}
