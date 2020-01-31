/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
      
     
    
==========================================================================================*/


export default [

  {
    url: "/dashboard",
    name: "Dashboard",       
    slug: "Dashboard",
    icon: "HomeIcon",
  },

  {
    url: "/master-setting",
    name: "Masters",       
    slug: "Masters",
    icon: "GridIcon",
  },

  {
    url: null,
    name: "User Management",
    slug: "UserManagement",
    icon: "UserIcon",
    i18n: "UserManagement",
    submenu: [  

      {
        url: '/admin',
        name: "Sub-Admin",
        slug: "Admin",
        i18n: "Admin",
      },

      {
        url: '/parents',
        name: "Parents",
        slug: "Parents",
        i18n: "Parents",
      },
      
      {
         url: '/service-provider',
         name: "ServiceProvider",
         slug: "ServiceProvider",
         i18n: "ServiceProvider",
       },
 
      
    ]
  },
  
]
