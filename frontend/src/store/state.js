import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

const userDefaults = {
  uid         : 0,          
  displayName : "John Doe", 
  about       : "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  photoURL    : require("@/assets/images/pages/placeholder_image.png"), 
  status      : "online",
  userRole    : "admin"
}
const state = {
    AppActiveUser           : userDefaults,
    bodyOverlay             : false,
    isVerticalNavMenuActive : true,
    mainLayoutType          : themeConfig.mainLayoutType || "vertical",
    navbarSearchAndPinList  : navbarSearchAndPinList,
    reduceButton            : themeConfig.sidebarCollapsed,
    verticalNavMenuWidth    : "default",
    verticalNavMenuItemsMin : false,
    scrollY                 : 0,
    starredPages            : navbarSearchAndPinList.data.filter((page) => page.highlightAction),
    theme                   : themeConfig.theme || "light",
    themePrimaryColor       : colors.primary,
    windowWidth: null,
    authToken : null,
	  userInfo : null
}

export default state
