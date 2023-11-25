<template lang="pug">
.d-flex.mr-0
  div
    nav.isolate.inline-flex.-space-x-px.rounded-lg
      a.relative.shadow-border.inline-flex.items-center.rounded-l-lg.px-2.py-2.text-gray-400.ring-1.ring-inset.ring-gray-300(class="hover:bg-gray-50 cursor-pointer")
        span Previous
      a.relative.inline-flex.items-center.px-4.py-2.text-sm.font-semibold.white--text.primary 1
      a.relative.shadow-border.inline-flex.items-center.px-4.py-2.text-sm.font-semibold.gray-900--text.ring-1.ring-inset.ring-gray-300(class="hover:bg-gray-50 cursor-pointer") 2
      a.relative.shadow-border.hidden.items-center.px-4.py-2.text-sm.font-semibold.text-gray-900.ring-1.ring-inset.ring-gray-300(class="hover:bg-gray-50 md:inline-flex cursor-pointer") 3
      a.relative.shadow-border.inline-flex.items-center.rounded-r-lg.px-2.py-2.text-gray-400.ring-1.ring-inset.ring-gray-300(class="hover:bg-gray-50 cursor-pointer")
        span Next
</template>

<script>
export default {
  name: 'PaginateComp',
  components: {},
  data () {
    return {}
  }
}
</script>
<style scoped>
.shadow-border {
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.24) !important;
}
</style>
