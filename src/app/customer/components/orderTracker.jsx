export default function OrderTracker({ status }) {
  const steps = [
  "Placed",
  "Accepted",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];
  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center relative">
            
            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-2 left-1/2 w-full h-[2px] ${
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* Circle */}
            <div
              className={`w-5 h-5 mx-auto rounded-full border-2 ${
                index <= currentStep
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            />

            {/* Label */}
            <p className="text-[11px] mt-2 text-gray-500">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}