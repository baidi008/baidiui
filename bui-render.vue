<script>
export default {
  name: 'bui-render',
  props: { vnode: { default: null } },
  mounted() {},
  render(e) {
    return e('div', this.vnode)
  }
}
</script>
