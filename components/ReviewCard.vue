<template>
  <div v-if="review" class="card">
    <div class="card-content">
      <p class="title is-4">
        <nuxt-link :to="'/reviews?bean=' + review.coffee.bean.id">
          {{ review.coffee.bean.fullName }}
        </nuxt-link>
      </p>
      <review-card-body :review="review"></review-card-body>
    </div>
    <footer class="card-footer">
      <modal-with-button
        :modal-key="'review-' + review.id"
        class="card-footer-item"
      >
        <template #open-button><i class="fas fa-coffee"></i></template>
        <template #modal-inner-content>
          <div class="columns">
            <div class="column">
              <ul>
                <li>Coffee-ID : {{ coffee.id }}</li>
                <li class="date">
                  抽出日 : <ConvertTime :time="coffee.createdAt" />
                </li>
                <li v-if="coffee.dripper">
                  <UsersName :users="[coffee.dripper]">Dripper : </UsersName>
                </li>
                <li v-if="coffee.drinkers">
                  <UsersName :users="coffee.drinkers">Drinkers : </UsersName>
                </li>
                <li v-if="coffee.memo">
                  メモ:
                  {{ coffee.memo }}
                </li>
                <CoffeeDetails :coffee="coffee" />
              </ul>
            </div>
          </div>
        </template>
      </modal-with-button>
      <div
        v-show="isReviewMine(review) && isEditTimeOK(review)"
        class="card-footer-item"
      >
        <button
          class="button"
          @click="$router.push('/reviews/update/' + review.id)"
        >
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <div
        v-show="isReviewMine(review) && !isEditTimeOK(review)"
        class="card-footer-item"
      >
        <button class="button" disabled>
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import ModalWithButton from "./ModalWithButton.vue";
import ReviewCardBody from "./ReviewCardBody.vue";
import Vue, { PropType } from "vue";
import { Coffee, User, Review } from "~/types/models";
export default Vue.extend({
  components: { ModalWithButton, ReviewCardBody },
  props: {
    review: { type: Object as PropType<Review>, default: null },
  },
  data(): {
    viewMore: boolean;
    isLogin: boolean;
    coffee: Coffee | null;
    currentUser: User | null;
  } {
    return {
      viewMore: false,
      isLogin: false,
      coffee: null,
      currentUser: this.$store.state.currentUser,
    };
  },

  created(): void {
    this.coffee = this.review.coffee;
    this.isLogin = this.$store.state.currentUser != null;
  },

  methods: {
    toggleViewMore(): void {
      this.viewMore = !this.viewMore;
    },
    isEditTimeOK(review: Review): boolean {
      if (!review.createdAt) return false;
      const diff = Date.now() - new Date(review.createdAt).getTime();
      return diff <= 60 * 30 * 1000;
    },
    isReviewMine(review: Review): boolean {
      return (
        this.currentUser != null && this.currentUser?.id === review.reviewer?.id
      );
    },
  },
});
</script>

<style lang="scss" scoped>
// TODO: hoverしたときの
.card {
  margin-bottom: 1em;
  height: 400px;
  .card-content {
    height: 340px;
    overflow-y: scroll;
  }
  .card-footer {
    height: 60px;
  }
}
</style>
