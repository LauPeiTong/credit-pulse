<template lang="pug">
v-card.user-profile.shadow.pa-2.rounded-lg(elevation="0")
  v-img.rounded-lg(:src="require(`../../assets/img/background.png`)" height="150")
    .blurry.full-width

  .d-flex.mt-n14.px-4
    v-avatar.profile-pic(size="120")
      img(:src="require(`../../assets/employee/10.png`)" alt="John")
    .d-grid.pt-15.pl-4
      p.mb-0.text-h6 Ray Gan Boon Kit
      p.mt-n1.body-2 Borrower ID: 123456

  .px-4.pt-4.pb-5
    p.font-weight-medium.mb-1 Borrower Details
    v-row
      template(v-for="item in basicData")
        v-col.pb-1.px-2(:cols="item.col")
          v-card.px-1.py-2.d-flex.rounded-lg(outlined)
            v-icon.primary--text.pa-2(small) {{ item.icon }}
            .d-grid.pl-1
              .caption.font-weight-light.darkGrey--text {{ item.title }}
              p.mb-0.mt-n1.body-2 {{ item.value }}
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      basicData: [
        {
          col: 6,
          icon: 'mdi-phone',
          title: 'Phone Number',
          value: '+6016-382 9423'
        },
        {
          col: 6,
          icon: 'mdi-email',
          title: 'Email Address',
          value: 'raygan@gmail.com'
        },
        {
          col: 4,
          icon: 'mdi-card-account-details',
          title: 'Identification Number',
          value: '001214-14-0923'
        },
        {
          col: 4,
          icon: 'mdi-calendar-blank',
          title: 'Date of Birth',
          value: '14 Dec 2000'
        },
        {
          col: 4,
          icon: 'mdi-calendar-blank',
          title: 'Age',
          value: '14 Dec 2000'
        },
        {
          col: 4,
          icon: 'mdi-calendar-blank',
          title: 'Gender',
          value: '14 Dec 2000'
        },
        {
          col: 4,
          icon: 'mdi-calendar-blank',
          title: 'Race',
          value: '14 Dec 2000'
        },
        {
          col: 4,
          icon: 'mdi-calendar-blank',
          title: 'Marital Status',
          value: '14 Dec 2000'
        }
      ]
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.blurry {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(25px);
}

.profile-pic {
  border: solid 4px white;
}
</style>
