<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
        <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary" dark
        class="text-center"
      >
        <v-card-text>
          
          <div class="flex_row_center_top">
            <div class="flex_col_top_left footer_column">
              <div class="footer_caption white--text" >{{ $t("footer.navigation") }}</div>
              <router-link class="white--text" to="/about">{{ $t("footer.about") }}</router-link>
              <router-link class="white--text" to="/c">{{ $t("footer.calculator") }}</router-link>
              <router-link class="white--text" to="/articles">{{ $t("footer.articles") }}</router-link>
            </div>

            <div class="flex_col_top_left footer_column">
              <div class="footer_caption white--text" >Language</div>
              <button v-on:click="locale='ru'">Русский</button>
              <button v-on:click="locale='en'">English</button>
            </div>

          </div>
          



        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — {{$t("footer.footer_text")}}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {    
    
    get locale(): string {return this.$i18n.locale; }
    set locale(val: string) {this.$i18n.locale = val;}
}

</script>

<style scoped lang="scss">
  .header_link{
    text-decoration: none;
    color:white;
  }
  .app_bar_header{
    font-weight: 400;
    font-size: 28px;
  }
  .logo{
    color:white;
    font-size: 36px;
    margin-top: -10px;
    margin-right: 10px;
  }
  .footer_column{
    margin-right:50px; 
    margin-left:50px; 
  }
  .footer_caption{
    font-size: 18px;
    margin-bottom: 16px;
  }
  footer a {
    text-decoration: unset;
    &:hover{
      text-decoration: underline;
    }
  }
</style>