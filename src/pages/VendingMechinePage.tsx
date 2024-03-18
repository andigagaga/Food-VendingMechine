import { useEffect, useState } from "react";
import BackgroundImage from "../assets/backgorund.jpg";
import Rupiah from "../assets/rupiah.json";
import { Button, ProductCard } from "../components";
import getProducts from "../services/api";
import { TFoods } from "../type";

import loadingLottie from "../assets/loading-icon.json";
import successLottie from "../assets/success.json";
import MoneyAnimation from "../assets/Money-Animation.json";
import Lottie from "lottie-react";
import ButtonBack from "../assets/button-back.json";
import { Link } from "react-router-dom";

export default function VendingMechinePage() {
  const [data, setData] = useState<TFoods[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<TFoods[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [money, setMoney] = useState(0);
  const [setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePayment = (amount: number) => {
    setMoney((prevMoney) => prevMoney + amount);
  };

  const handlePurchase = (productId: number) => {
    const productToPurchase = data.find((product) => product.id === productId);
    if (money > 0) {
      const updatedProducts = data.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock - 1 }
          : product
      );
      setData(updatedProducts);

      if (productToPurchase && productToPurchase.stock > 0) {
        const existingItemIndex = purchasedItems.findIndex(
          (item) => item.id === productId
        );
        if (existingItemIndex !== -1) {
          const updatedPurchasedItems = [...purchasedItems];
          updatedPurchasedItems[existingItemIndex] = {
            ...updatedPurchasedItems[existingItemIndex],
            quantity: updatedPurchasedItems[existingItemIndex].quantity + 1,
          };
          setPurchasedItems(updatedPurchasedItems);
        } else {
          const newItem = { ...productToPurchase, quantity: 1 };
          setPurchasedItems([...purchasedItems, newItem]);
        }
      }
    } else {
      alert("Anda belum mengisi saldo");
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const existingItemIndex = purchasedItems.findIndex(
      (item) => item.id === productId
    );
    if (existingItemIndex !== -1) {
      const updatedPurchasedItems = [...purchasedItems];
      if (updatedPurchasedItems[existingItemIndex].quantity > 1) {
        updatedPurchasedItems[existingItemIndex] = {
          ...updatedPurchasedItems[existingItemIndex],
          quantity: updatedPurchasedItems[existingItemIndex].quantity - 1,
        };
        setPurchasedItems(updatedPurchasedItems);

        const productToDecreasePrice = data.find(
          (product) => product.id === productId
        );
        if (productToDecreasePrice) {
          const updatedTotalPrice = totalPrice - productToDecreasePrice.price;
          setTotalPrice(updatedTotalPrice);
        }
      } else {
        const filteredItems = purchasedItems.filter(
          (item) => item.id !== productId
        );
        setPurchasedItems(filteredItems);

        const productToDecreasePrice = data.find(
          (product) => product.id === productId
        );
        if (productToDecreasePrice) {
          const updatedTotalPrice = totalPrice - productToDecreasePrice.price;
          setTotalPrice(updatedTotalPrice);
        }
      }

      const productToIncreaseStock = data.find(
        (product) => product.id === productId
      );
      if (productToIncreaseStock) {
        const updatedProducts = data.map((product) =>
          product.id === productId
            ? { ...product, stock: product.stock + 1 }
            : product
        );
        setData(updatedProducts);
      }
    }
  };

  const handleBuy = () => {
    const change = money - totalPrice;
    setChangeAmount(change);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
    setTotalPrice(0);
    setPurchasedItems([]);
    setMoney(0);
  };

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const getData = await getProducts();
        setData(getData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const timeOut = setTimeout(() => {
      getDataProduct();
    }, 8000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div
      className="h-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="w-full max-w-lg mx-auto bg-yellow-400 rounded-lg p-4">
        <div className="mb-3">
          <Link to={"/"}>
            <button className="flex justify-center items-center">
              <p className="text-white bg-black text-xs p-2 font-bold rounded-lg">
                BACK
              </p>
              <p className="ml-2">
                <Lottie animationData={ButtonBack} className="w-6 h-6" />
              </p>
            </button>
          </Link>
        </div>
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-center">
              <Lottie animationData={loadingLottie} className="w-36 h-36" />
              <p className="text-white font-bold">Loading...</p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {data.map((product: any, index: number) => (
            <ProductCard
              key={index}
              product={product}
              onPurchase={handlePurchase}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-5 mt-10">
          <div>
            <p className="text-black text-xs font-bold text-center">PUSH</p>
            <div className="border-2 border-black w-28 h-12 rounded-lg bg-gray-600 flex justify-center">
              <div className="flex gap-1">
                {purchasedItems.map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white w-full max-w-lg rounded-lg p-4">
        <Lottie animationData={MoneyAnimation} className="w-32 h-20 mx-auto" />
        <div className="flex mt-5 gap-4 justify-center">
          <Button
            value={"Rp2.000"}
            onClick={() => handlePayment(2000)}
            lottieFile={<Lottie animationData={Rupiah} />}
          />
          <Button
            value={"Rp5.000"}
            onClick={() => handlePayment(5000)}
            lottieFile={<Lottie animationData={Rupiah} />}
          />
          <Button
            value={"Rp10.000"}
            onClick={() => handlePayment(10000)}
            lottieFile={<Lottie animationData={Rupiah} />}
          />
          <Button
            value={"Rp20.000"}
            onClick={() => handlePayment(20000)}
            lottieFile={<Lottie animationData={Rupiah} />}
          />
          <Button
            value={"Rp50.000"}
            onClick={() => handlePayment(50000)}
            lottieFile={<Lottie animationData={Rupiah} />}
          />
        </div>
        <div className="mt-5 bg-white rounded-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-red-700 font-bold">Saldo</th>
                <th className="text-yellow-500 font-bold">Total harga</th>
                <th className="text-green-700 font-bold">Total kembalian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-red-700 font-bold">
                  Rp {money.toLocaleString()}
                </td>
                <td className="text-yellow-500 font-bold">
                  Rp {totalPrice.toLocaleString()}
                </td>
                <td className="text-green-700 font-bold">
                  Rp {changeAmount.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex p-5 flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex">
                <p className="text-green-700 font-bold">NAMA BARANG : </p>
                {purchasedItems.map((item) => (
                  <span
                    key={item.id}
                    className="text-white text-xs ml-2 bg-blue-800 p-1 rounded-lg"
                  >
                    {item.name} {item.quantity}x
                  </span>
                ))}
              </div>
              <div className="mt-7">
                {money > 0 && totalPrice > 0 && (
                  <div className="ml-10">
                    <button
                      onClick={handleBuy}
                      className="bg-green-500 text-white rounded-lg px-4 py-2 font-bold"
                    >
                      BELI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <dialog
          id="my_modal_3"
          className="fixed inset-0 z-50 overflow-auto bg-transparent bg-opacity-50 flex justify-center items-center"
        >
          <div className="modal-box bg-green-600 rounded-lg p-8 max-w-md">
            <div>
              <p className="text-red-700">Berhasil !!!</p>
            </div>
            <p className="text-lg">
              Total kembalian:{" "}
              <span className="text-yellow-500">
                Rp {changeAmount.toLocaleString()}
              </span>
            </p>
            <Lottie
              animationData={successLottie}
              className="w-20 h-20 mx-auto"
            />
          </div>
        </dialog>
      )}
    </div>
  );
}
