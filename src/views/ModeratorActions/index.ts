import { InjectReactApp } from "./InjectReactApp";
import { PreparePage } from "./PreparePage";

(async function () {
  await PreparePage();
  await InjectReactApp();
})();