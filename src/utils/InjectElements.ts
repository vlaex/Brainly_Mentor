export default function $(
  element: Element | string,
  position: InsertPosition,
  html: string
) {
  if (typeof element === "string")
    element = document.querySelector(element);
    
  element.insertAdjacentHTML(position, html);
}