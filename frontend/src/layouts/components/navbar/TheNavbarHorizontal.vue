<template>
<div class="relative">
  <div class="vx-navbar-wrapper navbar-full p-0">
    <vs-navbar class="navbar-custom navbar-skelton" :class="navbarClasses"  :style="navbarStyle" :color="navbarColor">

      <template v-if="windowWidth >= 992">
        <!-- STARRED PAGES - FIRST 10 -->
        <ul class="vx-navbar__starred-pages">
          <draggable v-model="starredPagesLimited" :group="{name: 'pinList'}" class="flex cursor-move">
            <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
              <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                <feather-icon svgClasses="h-6 w-6" class="p-2 cursor-pointer" :icon="page.labelIcon" @click="$router.push(page.url).catch(() => {})" />
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
                <draggable v-model="starredPagesMore" :group="{name: 'pinList'}" class="cursor-move">
                  <li class="starred-page--more flex items-center cursor-pointer" v-for="page in starredPagesMore" :key="page.url" @click="$router.push(page.url).catch(() => {})">
                    <feather-icon svgClasses="h-5 w-5" class="ml-2 mr-1" :icon="page.labelIcon"></feather-icon>
                    <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                  </li>
                </draggable>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

      </template>

   

    </vs-navbar>
  </div>
</div>
</template>

<script>


export default {
    name: "the-navbar",
    props: {
      logo: { type: String },
      navbarType: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            searchQuery: '',
            showFullSearch: false,
            unreadNotifications: [
                { index: 0, title: 'New Message', msg: 'Are your going to meet me tonight?', icon: 'MessageSquareIcon', time: this.randomDate({sec: 10}), category: 'primary' },
                { index: 1, title: 'New Order Recieved', msg: 'You got new order of goods.', icon: 'PackageIcon', time: this.randomDate({sec: 40}), category: 'success' },
                { index: 2, title: 'Server Limit Reached!', msg: 'Server have 99% CPU usage.', icon: 'AlertOctagonIcon', time: this.randomDate({min: 1}), category: 'danger' },
                { index: 3, title: 'New Mail From Peter', msg: 'Cake sesame snaps cupcake', icon: 'MailIcon', time: this.randomDate({min: 6}), category: 'primary' },
                { index: 4, title: 'Bruce\'s Party', msg: 'Chocolate cake oat cake tiramisu', icon: 'CalendarIcon', time: this.randomDate({hr: 2}), category: 'warning' },
            ],
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
            autoFocusSearch: false,
            showBookmarkPagesDropdown: false,
        }
    },
    watch: {
        '$route'() {
            if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
        }
    },
    computed: {
      navbarColor() {
        let color = "#fff"
        if(this.navbarType === "sticky") color = "#f7f7f7"
        else if(this.navbarType === 'static') {
          if(this.scrollY < 50) {
            color = "#f7f7f7"
          }
        }

        this.isThemedark === "dark" ? color === "#fff" ? color = "#10163a" : color = "#f58a8a9e" : null

        return color
      },
      isThemedark() {
        return this.$store.state.theme;
      },
        navbarStyle() {
          let style = {}

          if(this.navbarType === "static") {
            style.transition = "all .25s ease-in-out"

            // if(this.scrollY < 50) {
            //   style.background = "#262c49"
            // }
          }

          return style
        },
        navbarClasses() {
          return this.scrollY > 5 && this.navbarType === "static" ? null : "d-theme-dark-light-bg shadow-none"
        },
        scrollY() {
          return this.$store.state.scrollY
        },

        // HELPER
        verticalNavMenuWidth() {
            return this.$store.state.verticalNavMenuWidth
        },
        windowWidth() {
            return this.$store.state.windowWidth
        },

    
    },
    methods: {
        selected(item) {
            this.$router.push(item.url).catch(() => {})
            this.showFullSearch = false;
        },
        actionClicked(item) {
            // e.stopPropogation();
            this.$store.dispatch('updateStarredPage', { index: item.index, val: !item.highlightAction });
        },
        showNavbarSearch() {
            this.showFullSearch = true;
        },
        showSearchbar() {
            this.showFullSearch = true;
        },
        elapsedTime(startTime) {
            let x = new Date(startTime);
            let now = new Date();
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
                return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
            } else if (days > 0) {
                return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
            } else if (hours > 0) {
                return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
            } else if (minutes > 0) {
                return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
            } else if (seconds > 0) {
                return seconds + (seconds > 1 ? ' sec ago' : 'just now');
            }

            return 'Just Now'
        },
        logout() {
            // This is just for demo Purpose. If user clicks on logout -> redirect
            this.$router.push('/pages/login').catch(() => {})
        },
        outside: function() {
            this.showBookmarkPagesDropdown = false
        },

        // Method for creating dummy notification time
        randomDate({hr, min, sec}) {
          let date = new Date()

          if(hr) date.setHours(date.getHours() - hr)
          if(min) date.setMinutes(date.getMinutes() - min)
          if(sec) date.setSeconds(date.getSeconds() - sec)

          return date
        }
    },
    directives: {
        'click-outside': {
            bind: function(el, binding) {
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                }
                el.__vueClickOutside__ = handler
                document.addEventListener('click', handler)
            },

            unbind: function(el) {
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null

            }
        }
    },
  
}
</script>
