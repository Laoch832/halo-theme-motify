
const hitokotoContext = {
  init() {
    if ($('#hitokoto-home').length === 0) return
    this.fetchHitokoto()
    this.initEvents()
    this.updateDate()
  },

  async fetchHitokoto() {
    try {
      const response = await fetch(`${DreamConfig.theme_base}/js/yy.json`)
      const data = await response.json()
      const randomIndex = Math.floor(Math.random() * data.length)
      const item = data[randomIndex]
      this.render(item)
    } catch (error) {
      console.error('获取一言失败:', error)
      $('#hitokoto-text').text('获取一言失败，请重试')
    }
  },

  render(item) {
    $('#hitokoto-text').fadeOut(300, function () {
      $(this).text(item.hitokoto).fadeIn(300)
    })
    $('#hitokoto-from').fadeOut(300, function () {
      $(this).text(item.from || '未知').fadeIn(300)
    })

    // 随机背景图
    const bgImages = [
      `${DreamConfig.theme_base}/img/ba.webp`,
      `${DreamConfig.theme_base}/img/ga.webp`,
      `${DreamConfig.theme_base}/img/music.webp`
    ]
    const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)]
    $('#hitokoto-bg').css('background-image', `url(${randomBg})`)
    $('#hitokoto-image').css('background-image', `url(${randomBg})`)
  },

  initEvents() {
    $('#hitokoto-refresh').on('click', () => {
      this.fetchHitokoto()
    })
  },

  updateDate() {
    const date = new Date()
    const options = {month: 'long', day: 'numeric', year: 'numeric'}
    $('#hitokoto-date').text(date.toLocaleDateString('zh-CN', options))
  }
}

window.hitokotoContext = hitokotoContext

$(function () {
  hitokotoContext.init()
})
