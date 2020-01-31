import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"


// /////////////////////////////////////////////  
// Variables
// /////////////////////////////////////////////

const userDefaults = {
  uid         : 0,          // From Auth
  displayName : "John Doe", // From Auth
  about       : "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  photoURL    : require("@/assets/images/portrait/small/avatar-s-11.png"), // From Auth
  status      : "online",
  userRole    : "admin"
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    AppActiveUser           : userDefaults,
    bodyOverlay             : false,
    isVerticalNavMenuActive : true,
    mainLayoutType          : themeConfig.mainLayoutType || "vertical",
    reduceButton            : themeConfig.sidebarCollapsed,
    verticalNavMenuWidth    : "default",
    verticalNavMenuItemsMin : false,
    scrollY                 : 0,
    theme                   : themeConfig.theme || "light",
    themePrimaryColor       : colors.primary,
    windowWidth: null,
    authToken : null,
	  userInfo : null
}

export default state
