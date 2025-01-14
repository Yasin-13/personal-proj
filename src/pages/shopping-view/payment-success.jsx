import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10 bg-amber-50 border border-amber-300 rounded-lg shadow-md">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl font-extrabold text-amber-800">
          Payment is successful!
        </CardTitle>
      </CardHeader>
      <Button
        className="mt-5 text-white bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:outline-none"
        onClick={() => navigate("/shop/account")}
      >
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
