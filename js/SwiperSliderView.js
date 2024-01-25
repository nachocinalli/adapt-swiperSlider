/* eslint-disable no-undef */
import ComponentView from 'core/js/views/componentView';
import 'libraries/swiper-bundle';

class SwiperSliderView extends ComponentView {
  preRender() {
    this.listenTo(this.model.getChildren(), 'change:_isActive', this.onItemsActiveChange);
  }

  postRender() {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    this.setupSwiper();
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  onItemsActiveChange(item, _isActive) {
    if (!_isActive) return;

    item.toggleVisited(true);
  }

  setupSwiper() {
    const items = this.model.getChildren();
    if (!items || !items.length) return;

    let activeItem = this.model.getActiveItem();
    if (!activeItem) {
      activeItem = this.model.getItem(0);
      activeItem.toggleActive(true);
    }
    const id = this.model.get('_id');
    const selector = `.swiperslider[data-adapt-id="${id}"] .swiper`;
    const defaultOptions = {};
    const modelOptions = this.model.get('_swiperOptions');
    const swiperOptions = Object.assign(defaultOptions, modelOptions);
    this.swiper = new Swiper(`${selector}`, swiperOptions);
    this.swiper.on('slideChange', this.onSlideChange.bind(this));
  }

  onSlideChange() {
    if (this.swiper.params.effect === 'cards') {
      if (this.swiper.activeIndex === this.swiper.slides.length - 1) {
        this.setCompletionStatus();
      }
    }
    if (this.swiper.progress === 1) {
      this.setCompletionStatus();
    }
  }

  remove() {
    this.swiper.destroy();
    super.remove();
  }
}

SwiperSliderView.template = 'swiperSlider.jsx';

export default SwiperSliderView;
