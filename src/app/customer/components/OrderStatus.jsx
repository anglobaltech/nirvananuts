export default function OrderStatus({ status, payment }) {
  return (
    <div className="flex justify-between mt-4 text-sm">
      
      <p>
        Status: 
        <span className="ml-1 font-medium text-blue-600">
          {status}
        </span>
      </p>

      <p>
        Payment: 
        <span className="ml-1 font-medium text-green-600">
          {payment}
        </span>
      </p>

    </div>
  );
}