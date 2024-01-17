import type { JSXElement } from "solid-js"

type Props = {
  type: "warning" | "error";
  children: JSXElement
};

function getColourFromType(type: Props["type"]) {
  switch (type) {
    case "error":
      return "bg-red-600 font-bold";
    case "warning":
      return "bg-orange-500";
  }
}

function Card(props: Props) {
 return (
    <div class={`my-2 px-4 rounded-md ${getColourFromType(props.type)} p-2 text-center`}>
      {props.children}
    </div>
 )
}

export { Card }