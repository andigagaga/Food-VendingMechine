
export default function Button({ onClick, value, disabled, lottieFile }: any) {
  return (
    <div>
      <button
        className="bg-green-700 border-2 border-black py-2 px-4 rounded-md mb-5 w-40"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex w-full justify-center items-center">
          <p className="w-12">{lottieFile}</p>
          <p className="font-bold text-orange-600">{value}</p>
        </div>
      </button>
    </div>
  );
}
