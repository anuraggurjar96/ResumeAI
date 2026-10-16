export default function Stepper({ step }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4, 5].map((item, idx) => (
        <div key={item} className="flex flex-1 items-center last:flex-none">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition ${
              step >= item
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {item}
          </div>

          {idx < 4 && (
            <div className="flex-1 h-1 bg-green-200 mx-2 relative">
              <div
                className={`absolute top-0 left-0 h-full bg-green-400 transition-all duration-300 ${
                  step > item ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}