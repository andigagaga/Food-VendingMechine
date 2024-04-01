export default function Button({ onClick, value, disabled }: any) {
  return (
    <div>
      <button
        className="text-white bg-green-700 rounded-md"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex w-full justify-center items-center">
          <p className="text-xs text-white p-2">{value}</p>
        </div>
      </button>
    </div>
  );
}