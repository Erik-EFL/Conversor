import React from "react";
import {Chip} from "@nextui-org/react";

interface propsController {
  name:string
  status: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined,
}

export default function ChipComponent({ name, status }: propsController) {
  return (
    <div className="flex gap-4">
      <Chip color={status}>{name}</Chip>
    </div>
  );
}
