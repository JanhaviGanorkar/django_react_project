import React from "react";
// import Button from "./components/ui/Button";
import Button from "../../src/components/ui/Button"
import Card from "../../src/components/ui/Card"

function Stu() {
  return (
    <div className="">
          <Card className="bg-red-100 border-red-400" title="Error Card" description="Error ya alert ke liye.">
        <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Fix Issue
        </button>
      </Card>
      <Card title="First Card" description="Yeh ek simple Radix UI + Tailwind card hai.">
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Click Me
        </button>
      </Card>
    <Button color="blue">Blue Button</Button>
    <Button color="red">Red Button</Button>
    <Button color="green">Green Button</Button>
    <Button color="yellow">Yellow Button</Button>

    {/* Custom Color using className */}
    <Button color="custom" className="bg-purple-500 hover:bg-purple-600 text-white">
      Purple Button
    </Button>
    <Button className="!bg-red-500 !hover:bg-red-700 !text-white">
  Red Button
</Button>

  </div>
);
}

export default Stu;
