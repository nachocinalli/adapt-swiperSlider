import React from 'react';
import a11y from 'core/js/a11y';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function SwiperSlider({ _items, ...props }) {
  const { _id, _swiperOptions, _ariaLevel } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) && _ariaLevel !== 0 ? _ariaLevel + 1 : _ariaLevel;
  const _hasNavigation = _swiperOptions?.navigation;
  const _hasPagination = _swiperOptions?.pagination;

  return (
    <div className='component__inner swiper__inner'>
      <templates.header {...props} />
      <div className='component__widget swiper__widget swiper'>
        <div className={classes(['swiper-wrapper'])} role='list'>
          {_items.map(({ _isActive, title, body, bodyAfter, _classes, _graphic }, index) => (
            <div
              key={index}
              className={classes([
                'swiper-item',
                'swiper-slide',
                _isActive && 'is-animating',
                _graphic?.src && 'has-image',
                title && 'has-title',
                body && 'has-body',
                _classes
              ])}
              role='listitem'
              style={{}}
            >
              <div className='swiper-item__inner'>
                {!_graphic?.src && <div className='swiper-item__bullet' aria-hidden='true' />}
                {_graphic?.src && (
                  <templates.image
                    {..._graphic}
                    classNamePrefixes={['component-item', 'swiper-item']}
                    attributionClassNamePrefixes={['component', 'swiper']}
                  />
                )}

                <div className='swiper-item__content'>
                  {title && (
                    <div
                      className='swiper-item__title'
                      role='heading'
                      aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem', override: _ariaLevel ?? itemAriaLevel })}
                    >
                      <div className='swiper-item__title-inner' dangerouslySetInnerHTML={{ __html: compile(title, props) }} />
                    </div>
                  )}

                  {body && (
                    <div className='swiper-item__body'>
                      <div className='swiper-item__body-inner' dangerouslySetInnerHTML={{ __html: compile(body, props) }} />
                    </div>
                  )}
                  {bodyAfter && (
                    <div className='swiper-item__body-after'>
                      <div className='swiper-item__body-after-inner' dangerouslySetInnerHTML={{ __html: compile(bodyAfter, props) }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {_hasNavigation && (
          <>
            <div className='swiper-button-next btn-icon'></div>
            <div className='swiper-button-prev btn-icon'></div>
          </>
        )}
        {_hasPagination && <div className='swiper-pagination'></div>}
      </div>
    </div>
  );
}
