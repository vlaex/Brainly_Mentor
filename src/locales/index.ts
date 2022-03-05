import ru from "./ru";
import en from "./en";

const configs = [en, ru];
const locale = configs.find(config => 
	config.marketHost === window.location.host
) || configs[0];

export default locale;