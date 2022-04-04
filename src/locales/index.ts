import ru from "./ru";
import en from "./en";
import fr from "./fr";

const configs = [en, ru, fr];
const locale = configs.find(config => 
  config.marketHost === window.location.host
) || configs[0];

export default locale;