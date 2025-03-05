import React from "react";
// import Button from "./components/ui/Button";
import Button from "../../src/components/ui/Button"
import Card from "../../src/components/ui/Card"

function Stu() {
  return (
    <>
          <Card className="bg-black text-amber-50 h-[200px] w-[200px] border-black-400" title="Error Card" description="Error ya alert ke liye.">
        <button className="mt-3 !bg-red-500 text-amber-50 px-4 py-2 rounded-md hover:bg-red-600">
          Fix Issue
        </button>
      </Card>
      <Card className="w-[200px]" title="First Card" description="Yeh ek simple Radix UI + Tailwind card hai.">
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Click Me
        </button>
      </Card>
      
    {/* Custom Color using className */}
    <Button color="custom" className="bg-purple-500 hover:bg-purple-600 text-white">
      Purple Button
    </Button>
    <Button className="!bg-red-500 !hover:bg-red-700 !text-white">
  Red Button
</Button>

  </>
);
}

export default Stu;



