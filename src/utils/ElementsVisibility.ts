export const HideElement = (element: HTMLElement) => 
  element.classList.add("hidden");

export const ShowElement = (element: HTMLElement) => 
  element.classList.remove("hidden");