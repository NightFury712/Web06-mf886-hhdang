export const HandlerTooltip = {
  methods: {
    /**
     * Hàm lấy vị trí để hiển thị tooltip
     * @param {String} position Vị trí con trỏ chuột
     * @returns Vị trí hiển thị tooltip
     * Author: HHDang(20/8/2021)
     */
    getMousePosition(position) {
      return {
        x: position.offsetX + 10,
        y: position.offsetY + 10,
      }
    }
  },
}