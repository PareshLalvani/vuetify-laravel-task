<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <template v-if="windowWidth >= 992">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable
              v-model="starredPagesLimited"
              :group="{name: 'pinList'}"
              class="flex cursor-move"
            >
              <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
                <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                  <feather-icon
                    svgClasses="h-6 w-6"
                    class="p-2 cursor-pointer"
                    :icon="page.labelIcon"
                    @click="$router.push(page.url).catch(() => {})"
                  />
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- STARRED PAGES MORE -->
          <div class="vx-navbar__starred-pages--more-dropdown" v-if="starredPagesMore.length">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="cursor-pointer p-2"></feather-icon>
              <vs-dropdown-menu>
                <ul class="vx-navbar__starred-pages-more--list">
                  <draggable
                    v-model="starredPagesMore"
                    :group="{name: 'pinList'}"
                    class="cursor-move"
                  >
                    <li
                      class="starred-page--more flex items-center cursor-pointer"
                      v-for="page in starredPagesMore"
                      :key="page.url"
                      @click="$router.push(page.url).catch(() => {})"
                    >
                      <feather-icon svgClasses="h-5 w-5" class="ml-2 mr-1" :icon="page.labelIcon"></feather-icon>
                      <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                    </li>
                  </draggable>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

         
        </template>

        <vs-spacer />

        
      </vs-navbar>
    </div>
  </div>
</template>

<script>

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  
 computed: {
    navbarColorLocal() {
      return this.$store.state.theme === "dark" ? "#10163a" : this.navbarColor;
    },
    // HELPER
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == "default") return "navbar-default";
      else if (this.verticalNavMenuWidth == "reduced") return "navbar-reduced";
      else if (this.verticalNavMenuWidth) return "navbar-full";
    },

  },

  mounted() {
    this.getAllNotifications();
  },

  methods: {
    viewDetails(type,id) {
      if(type==='services')
      {
         this.$router.push("/services/view/" + id);
      }
      else
      {
        this.$router.push("/places/view/" + id);
      }
      
    },

    getAllNotifications() {
      let input = {};

      this.axios
        .post("notification/notificationList", input)
        .then(response => {
          let data = response.data.data;
          this.Notifications = data;

          // if (this.Notifications) {
          //   let sender_detail = this.Notifications.categories;
          //   this.sender_detail = sender_detail;
          // }
        })
        .catch(e => {
          this.showError(e);
        });
    },

    showSidebar() {
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
    },
    selected(item) {
      this.$router.push(item.url).catch(() => {});
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },

    elapsedTime(startTime) {
      let x = new Date(startTime);
      //console.log(x.toUTCString());
      //let now = new Date();
      let now = new Date(moment.utc().format("YYYY-MM-DD HH:mm:ss"));
      var timeDiff = now - x;
      timeDiff /= 1000;
      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);
      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);
      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);
      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);
      var years = timeDiff;
      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : "just now");
      }
      return "Just Now";
    },

    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },

    // Method for creating dummy notification time
    randomDate({ hr, min, sec }) {
      let date = new Date();

      if (hr) date.setHours(date.getHours() - hr);
      if (min) date.setMinutes(date.getMinutes() - min);
      if (sec) date.setSeconds(date.getSeconds() - sec);

      return date;
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  
};
</script>
