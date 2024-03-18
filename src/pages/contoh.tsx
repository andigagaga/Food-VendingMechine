// import Lottie from "lottie-react";
// import { useEffect, useState } from "react";
// import "../App.css";
// import BackgroundImage from "../assets/backgorund.jpg";
// import Buy from "../assets/buy.json";
// import loadingLottie from "../assets/loading-icon.json";
// import Rupiah from "../assets/rupiah.json";
// import successLottie from "../assets/success.json";
// import vendingMechineLottie from "../assets/vendingMechine.json";
// import Button from "../components/Button";
// import { TFoods } from "../type";
// import { ProductCard } from "../components";
// import getProducts from "../services/api";
// import ButtonBack from "../assets/button-back.json";
// import { Link } from "react-router-dom";

// function VendingMechinePage() {
//   const [data, setData] = useState<TFoods[]>([]);
//   const [purchasedItems, setPurchasedItems] = useState<TFoods[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [money, setMoney] = useState(0);
//   const [, setIsActive] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [changeAmount, setChangeAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const handlePayment = (amount: number) => {
//     setMoney(amount);
//     setIsActive(false);
//   };

//   const handlePurchase = (productId: number) => {
//     const productToPurchase = data.find((product) => product.id === productId);
//     if (money > 0) {
//       const updatedProducts = data.map((product) =>
//         product.id === productId
//           ? { ...product, stock: product.stock - 1 }
//           : product
//       );
//       setData(updatedProducts);

//       if (productToPurchase && productToPurchase.stock > 0) {
//         const existingItemIndex = purchasedItems.findIndex(
//           (item) => item.id === productId
//         );
//         if (existingItemIndex !== -1) {
//           const updatedPurchasedItems = [...purchasedItems];
//           updatedPurchasedItems[existingItemIndex] = {
//             ...updatedPurchasedItems[existingItemIndex],
//             quantity: updatedPurchasedItems[existingItemIndex].quantity + 1,
//           };
//           setPurchasedItems(updatedPurchasedItems);
//         } else {
//           const newItem = { ...productToPurchase, quantity: 1 };
//           setPurchasedItems([...purchasedItems, newItem]);
//         }

//         const updatedTotalPrice = totalPrice + productToPurchase.price;
//         if (updatedTotalPrice > money) {
//           setIsActive(true);
//         } else {
//           setTotalPrice(updatedTotalPrice);
//         }
//       }
//     } else {
//       alert("Anda belum mengisi saldo");
//     }
//   };

//   const handleDecreaseQuantity = (productId: number) => {
//     const existingItemIndex = purchasedItems.findIndex(
//       (item) => item.id === productId
//     );
//     if (existingItemIndex !== -1) {
//       const updatedPurchasedItems = [...purchasedItems];
//       if (updatedPurchasedItems[existingItemIndex].quantity > 1) {
//         updatedPurchasedItems[existingItemIndex] = {
//           ...updatedPurchasedItems[existingItemIndex],
//           quantity: updatedPurchasedItems[existingItemIndex].quantity - 1,
//         };
//         setPurchasedItems(updatedPurchasedItems);

//         const productToDecreasePrice = data.find(
//           (product) => product.id === productId
//         );
//         if (productToDecreasePrice) {
//           const updatedTotalPrice = totalPrice - productToDecreasePrice.price;
//           setTotalPrice(updatedTotalPrice);
//         }
//       } else {
//         const filteredItems = purchasedItems.filter(
//           (item) => item.id !== productId
//         );
//         setPurchasedItems(filteredItems);

//         const productToDecreasePrice = data.find(
//           (product) => product.id === productId
//         );
//         if (productToDecreasePrice) {
//           const updatedTotalPrice = totalPrice - productToDecreasePrice.price;
//           setTotalPrice(updatedTotalPrice);
//         }
//       }

//       const productToIncreaseStock = data.find(
//         (product) => product.id === productId
//       );
//       if (productToIncreaseStock) {
//         const updatedProducts = data.map((product) =>
//           product.id === productId
//             ? { ...product, stock: product.stock + 1 }
//             : product
//         );
//         setData(updatedProducts);
//       }
//     }
//   };

//   const handleBuy = () => {
//     const change = money - totalPrice;
//     setChangeAmount(change);
//     setShowModal(true);
//     setTimeout(() => {
//       setShowModal(false);
//     }, 2000);
//     setTotalPrice(0);
//     setPurchasedItems([]);
//     setMoney(0);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fetchedData = await getProducts();
//         setData(fetchedData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setIsLoading(false);
//       }
//     };

//     const timeOut = setTimeout(() => {
//       fetchProducts();
//     }, 3000);

//     return () => clearTimeout(timeOut);
//   }, []);

//   return (
//     <div
//       className="container-fluid flex gap-10 w-screen"
//       style={{ backgroundImage: `url(${BackgroundImage})` }}
//     >
//       {isLoading && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//           <div>
//             <div className="font-bold text-red-600">
//               <Lottie animationData={loadingLottie} />
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex">
//         <div className="container bg-transparent">
//           <div className="flex gap-8">
//             <Link to={"/"}>
//               <div className="flex justify-center items-center">
//                 <Lottie animationData={ButtonBack} className=" h-10" />
//                 <span className="text-black font-bold">Back</span>
//               </div>
//             </Link>
//             <div>
//               <h1 className="text-black font-bold">Vending Machine</h1>
//               <div className="balance text-black">
//                 Saldo:{" "}
//                 <span className="text-green-600">
//                   Rp{money.toLocaleString()}
//                 </span>
//               </div>
//               {totalPrice > 0 && (
//                 <>
//                   <div className="change text-black">
//                     Total harga:{" "}
//                     <span className="text-green-600">
//                       Rp{totalPrice.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex flex-row gap-3 mb-5 justify-center items-center">
//                     <p className="text-black">Nama barang yang dipesan:</p>
//                     {purchasedItems.map((item, index) => (
//                       <div key={index}>
//                         <p className="bg-orange-400 p-2 w-28 rounded-full text-white font-bold">
//                           {item.name}{" "}
//                           {item.quantity > 1 && <span>{item.quantity}x</span>}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="products">
//             {data.map((product: any, index: number) => (
//               <ProductCard
//                 key={index}
//                 product={product}
//                 onPurchase={handlePurchase}
//                 onDecreaseQuantity={handleDecreaseQuantity}
//                 disable={money === 0}
//               />
//             ))}
//           </div>
//           <div className="container-fluid bg-transparent lg:flex gap-5 mt-10">
//             <Button
//               value={"Rp2.000"}
//               onClick={() => handlePayment(2000)}
//               lottieFile={<Lottie animationData={Rupiah} />}
//             />
//             <Button
//               value={"Rp5.000"}
//               onClick={() => handlePayment(5000)}
//               lottieFile={<Lottie animationData={Rupiah} />}
//             />
//             <Button
//               value={"Rp10.000"}
//               onClick={() => handlePayment(10000)}
//               lottieFile={<Lottie animationData={Rupiah} />}
//             />
//             <Button
//               value={"Rp20.000"}
//               onClick={() => handlePayment(20000)}
//               lottieFile={<Lottie animationData={Rupiah} />}
//             />
//             <Button
//               value={"Rp50.000"}
//               onClick={() => handlePayment(50000)}
//               lottieFile={<Lottie animationData={Rupiah} />}
//             />
//           </div>
//           <div className="mt-1">
//             <Button
//               onClick={handleBuy}
//               disabled={money < totalPrice}
//               className="px-4 py-2 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               lottieFile={<Lottie animationData={Buy} />}
//             />
//           </div>
//         </div>
//         <div className=" lg:flex lg:items-center lg:justify-center">
//           {showModal && (
//             <dialog
//               id="my_modal_3"
//               className="fixed inset-0 z-50 overflow-auto bg-transparent bg-opacity-50 flex justify-center items-center"
//             >
//               <div className="modal-box bg-green-600 rounded-lg p-8 max-w-md">
//                 <div>
//                   <Lottie className="w-20 h-20" animationData={successLottie} />
//                   <p>Berhasil !!!</p>
//                 </div>
//                 <p className="text-lg">Total kembalian: Rp{changeAmount}</p>
//               </div>
//             </dialog>
//           )}
//           <Lottie className="h-screen" animationData={vendingMechineLottie} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VendingMechinePage;