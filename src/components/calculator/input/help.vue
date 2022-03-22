<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                >
                <v-icon dark>
                    mdi-help-circle-outline
                </v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2" v-html="help_title">
            </v-card-title>

            <v-card-text style="margin-top: 20px;">
                <span v-html="help_text"></span>
                <slot></slot>
            </v-card-text>

            <v-divider></v-divider>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions> -->
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Help extends Vue {
    
    dialog: boolean = false;

    @Prop({default: ""}) help_text!: string;
    @Prop({default: 'value'}) help_title!: string;
}
</script>