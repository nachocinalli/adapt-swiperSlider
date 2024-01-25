import components from 'core/js/components';
import SwiperSliderView from './SwiperSliderView';
import SwiperSliderModel from './SwiperSliderModel';

export default components.register('swiperSlider', {
  model: SwiperSliderModel,
  view: SwiperSliderView
});
