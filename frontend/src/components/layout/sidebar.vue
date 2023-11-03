<template>
    <v-app>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/95.jpg"
              title="Sachin Kumar Verma"
              subtitle="sverma@argusoft.com"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-account-multiple" title="My Files" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-app>
  </template>