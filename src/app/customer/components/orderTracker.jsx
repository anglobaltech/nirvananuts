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
    <div className="mt-4 w-full">
      
      {/* 1. MOBILE/TABLET VIEW (Vertical Timeline: Hidden from 'lg' onwards) */}
      <div className="flex flex-col space-y-4 lg:hidden pl-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start relative group">
            
            {/* Vertical Line Connecting Steps */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-[9px] top-5 w-[2px] h-[calc(100%+16px)] ${
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* Circle indicator */}
            <div
              className={`w-5 h-5 rounded-full border-2 z-10 flex-shrink-0 transition-colors duration-200 ${
                index <= currentStep
                  ? "bg-green-500 border-green-500"
                  : "bg-white border-gray-300"
              }`}
            />

            {/* Label text */}
            <div className="ml-4 -mt-0.5">
              <p
                className={`text-sm font-medium transition-colors duration-200 ${
                  index <= currentStep ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DESKTOP VIEW (Horizontal Stepper: Displays starting at 'lg' (768px)) */}
      <div className="hidden lg:flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center relative">
            
            {/* Horizontal Line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-2.5 left-1/2 w-full h-[2px] transition-colors duration-200 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* Circle indicator */}
            <div
              className={`w-5 h-5 mx-auto rounded-full border-2 z-10 relative transition-colors duration-200 ${
                index <= currentStep
                  ? "bg-green-500 border-green-500"
                  : "bg-white border-gray-300"
              }`}
            />

            {/* Label text */}
            <p
              className={`text-xs mt-2 px-1 font-medium break-words transition-colors duration-200 ${
                index <= currentStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}