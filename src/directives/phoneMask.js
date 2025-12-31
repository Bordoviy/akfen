export default {
  mounted(el) {
    if (!window.Inputmask) return

    window
      .Inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      })
      .mask(el)
  },
}
