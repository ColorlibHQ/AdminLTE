![ion.rangeSlider](_tmp/logo-ion-range-slider.png)

> <a href="readme.md">English description</a> | Описание на русском

Удобный, гибкий и отзывчивый слайдер диапазонов

***

* Версия: 2.2.0
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/index.html">Страница проекта и демо</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/ion.rangeSlider-2.2.0.zip">Загрузить ZIP-архив</a>

## Описание
* Ion.RangeSlider — классный, удобный, отзывчивый и легко настраиваемый слайдер диапазонов
* Слайдер поддерживает события и публичные методы, имеет гибкие настройки, может быть полностью видоизменен через CSS
* Кроссбраузерная поддержка: Google Chrome, Mozilla Firefox 3.6+, Opera 12+, Safari 5+, Internet Explorer 8+
* Плагин поддерживает устройства с touch-экраном (iPhone, iPad, Nexus, etc.)
* <a href="https://github.com/IonDen/ion.rangeSlider">Репозиторий на GitHub</a>
* Плагин свободно распространяется на условиях <a href="http://ionden.com/a/plugins/licence.html" target="_blank">лицензии MIT</a>
* Используюя этот плагин, вы сможете создавать крутейшие слайдеры диапазонов, такие как этот:

![ion.rangeSlider](http://ionden.com/a/plugins/ion.rangeSlider/static/img/ion-range-slider.png)

## Ключевые особенности
* Поддержка скинов. (5 скина в комплекте и PSD для изготовления собственных)
* Неограниченное кол-во слайдеров на одной странице без существенных потерь производительности и конфликтов между ними
* Два режима работы с 1 или 2 ползунками
* Поддержка отрицательных и дробных значений
* Возможность редактировать шаг и привязывать сетку к шагу
* Можно использовать собственный массив значений для слайдера
* Настраиваемая сетка значений
* Отключаемые элементы интерфейса (мин. и макс. значение, текущие значение, сетка)
* Постфиксы и префиксы для указания единиц измерения ($20, 20 &euro; и т.п.)
* Дополнительный постфикс для максимального значения (например $0 — $100<b>+</b>)
* Воможнось улучшить читабельность больших цифр (например 10000000 -> 10 000 000 или 10.000.000)
* Слайдер пишет свое значение прямо в value исходного поля input, что позволяет вставить сладер прямо внутрь любой формы
* Любой параметр слайдера можно так же задать через data-атрибут (например data-min="10")
* Слайдер поддерживает параметр disabled, позволяет делать слайдер неактивным
* Слайдер поддерживает внешние методы (update, reset и remove), позволяющие управлять слайдером уже после создания
* Для продвинутых пользователей есть поддержка колбэков (onStart, onChange, onFinish, onUpdate). Слайдер передает свои значения в эти функции первым аргументом в виде объекта
* Слайдер поддерживает работу с датой и временем


## Демо

* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo.html" class="switch__item">Базовые настройки</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_advanced.html" class="switch__item">Расширенные настройки</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_interactions.html" class="switch__item">Взаимодействия</a>


## Зависимости

* <a href="http://jquery.com/" target="_blank">jQuery 1.8.x+</a>


## Использование

Подключаем библиотеки:
* jQuery
* ion.rangeSlider.min.js

Подключаем стили:
* <a href="http://necolas.github.io/normalize.css/" target="_blank">normalize.css</a> (желательно, если он у вас еще не подключен)
* ion.rangeSlider.css

Не забываем про скин. 5 скинов включены в архив. Выберите один:
* ion.rangeSlider.skinFlat.css + sprite-skin-flat.png
* ion.rangeSlider.skinHTML5.css + без картинок
* ion.rangeSlider.skinModern.css + sprite-skin-modern.png
* ion.rangeSlider.skinNice.css + sprite-skin-nice.png
* ion.rangeSlider.skinSimple.css + sprite-skin-simple.png
                            
Либо воспользуйтесь вложенным в архив PSD файлом, и нарисуйте собственный скин (не забудьте модифицировать размеры элементов в CSS файле)


## Устанавливаем с помощью bower

* bower install ionrangeslider


## Устанавливаем с помощью npm

* npm install ion-rangeslider


## Инициализация

Создаем базовое поле <code>input type="text"</code>:
```html
<input type="text" id="example_id" name="example_name" value="" />
```

Чтобы запустить слайдер, вызовите ionRangeSlider для нужного элемента:
```javascript
$("#example_id").ionRangeSlider();
```

## Демо для новичков
Если вы новичок в веб разработке и не уверены как правильно подключить этот плагин на вашу страницу, то скачайте вот
<a href="http://ionden.com/a/plugins/ion.rangeSlider/ionRangeSliderDemo.zip" class="button">этот демо пример</a>


## <a href="http://jsfiddle.net/IonDen/qv6yrjrv/" target="_blank">Площадка для эксперементов с плагином</a>

Здесь вы найдете несколько полезных JSFIDDLE-демо, по нестандартному использованию плагина:
* [Reverse or RTL](http://jsfiddle.net/IonDen/gbmszmp4/)
* [1 handle bind to 1 input](http://jsfiddle.net/IonDen/mvrfg2vc/)
* [2 handles bind to 2 inputs](http://jsfiddle.net/IonDen/r5aox84v/)
* [2 sliders connected to each other](http://jsfiddle.net/IonDen/4k3d4y3s/)
* [1st slider disables/enables 2nd slider](http://jsfiddle.net/IonDen/ctkouh69/)
* [Non-linear slider](http://jsfiddle.net/IonDen/pzjaoxe7/)
* [Plus and Minus buttons](http://jsfiddle.net/IonDen/wsk7y08a/)
* [Calculating sum](http://codepen.io/anon/pen/QyzwJZ)
* [Adding one more diapazon on 1 slider](http://jsfiddle.net/IonDen/st9eotpy/)
* [Live editing of Min and Max values](http://jsfiddle.net/IonDen/wL8gq4py/)
* [Prettify and transform values at the same time](http://jsfiddle.net/IonDen/j0tLzgq1/)
* [Custom marks on slider](http://jsfiddle.net/IonDen/spez12kt/)
* [Rendering money value n.nn](http://jsfiddle.net/IonDen/vrqqL2Lw/)
* [Rendering Dates with Moment.js](http://jsfiddle.net/tvn2ckj2/)
* [Changing step live](http://jsfiddle.net/IonDen/ca6ykae6/)
* [Toggle slider](http://jsfiddle.net/IonDen/t936wtjv/)
* [Using different skin color at the same time](http://jsfiddle.net/IonDen/2sruxk4e/)
* [2 dependant sliders](http://jsfiddle.net/IonDen/n2sxswv2/)
* [Skip some values](http://jsfiddle.net/IonDen/4qgq9bto/)
* [Good Prettify example](http://jsfiddle.net/IonDen/bvbvr0xs/)


## Настройка

| Option | Data-Attr | Defaults | Type | Description |
| --- | --- | --- | --- | --- |
| `type` | `data-type` | `single` | string | Choose slider type, could be `single` - for one handle, or `double` for two handles |
| `min` | `data-min` | `10` | number | Set slider minimum value |
| `max` | `data-max` | `100` | number | Set slider maximum value |
| `from` | `data-from` | `min` | number | Set start position for left handle (or for single handle) |
| `to` | `data-to` | `max` | number | Set start position for right handle |
| `step` | `data-step` | `1` | number | Set sliders step. Always > 0. Could be fractional |
| `min_interval` | `data-min-interval` | `-` | number | Set minimum diapason between sliders. Only for **double** type |
| `max_interval` | `data-max-interval` | `-` | number | Set minimum maximum between sliders. Only for **double** type |
| `max_drag_interval` | `data-drag-interval` | `false` | boolean | Allow user to drag whole range. Only for **double** type |
| `values` | `data-values` | `[]` | array | Set up your own array of possible slider values. They could be numbers or strings. If the values array is set up, min, max and step param, can no longer be changed |
| `from_fixed` | `data-from-fixed` | `false` | boolean | Fix position of left (or single) handle |
| `from_min` | `data-from-min` | `min` | number | Set minimum limit for left (or single) handle |
| `from_max` | `data-from-max` | `max` | number | Set maximum limit for left (or single) handle |
| `from_shadow` | `data-from-shadow` | `false` | boolean | Highlight the limits for left handle |
| `to_fixed` | `data-to-fixed` | `false` | boolean | Fix position of right handle |
| `to_min` | `data-to-min` | `min` | number | Set minimum limit for right handle |
| `to_max` | `data-to-max` | `max` | number | Set maximum limit for right handle |
| `to_shadow` | `data-to-shadow` | `false` | boolean | Highlight the right handle |
| `prettify_enabled` | `data-prettify-enabled` | `true` | boolean | Improve readability of long numbers: 10000000 &rarr; 10 000 000 |
| `prettify_separator` | `data-prettify-separator` | ` ` | string | Set up your own separator for long numbers: 10000000 &rarr; 10,000,000 etc. |
| `prettify` | `-` | `null` | function | Set up your own prettify function. Can be anything. For example, you can set up unix time as slider values and than transform them to cool looking dates |
| `force_edges` | `data-force-edges` | `false` | boolean | Sliders handles and tooltips will be always inside it's container |
| `keyboard` | `data-keyboard` | `true` | boolean | Activates keyboard controls. Move left: &larr;, &darr;, A, S. Move right: &rarr;, &uarr;, W, D. |
| `grid` | `data-grid` | `false` | boolean | Enables grid of values above the slider |
| `grid_margin` | `data-grid-margin` | `true` | boolean | Set left and right grid gaps |
| `grid_num` | `data-grid-num` | `4` | number | Number of grid units |
| `grid_snap` | `data-grid-snap` | `false` | boolean | Snap grid to sliders step (step param). If activated, grid_num will not be used. Max steps = 50 |
| `hide_min_max` | `data-hide-min-max` | `false` | boolean | Hides **min** and **max** labels |
| `hide_from_to` | `data-hide-from-to` | `false` | boolean | Hides **from** and **to** labels |
| `prefix` | `data-prefix` | `` | string | Set prefix for values. Will be set up right before the number: **$**100 |
| `postfix` | `data-postfix` | `` | string | Set postfix for values. Will be set up right after the number: 100**k** |
| `max_postfix` | `data-max-postfix` | `` | string | Special postfix, used only for maximum value. Will be showed after handle will reach maximum right position. For example **0 — 100+** |
| `decorate_both` | `data-decorate-both` | `true` | boolean | Used for **double** type and only if prefix or postfix was set up. Determine how to decorate close values. For example: **$10k — $100k** or **$10 — 100k** |
| `values_separator` | `data-decorate-both` | ` - ` | string | Set your own separator for close values. Used for **double** type. Default: **10 — 100**. Or you may set: **10 to 100, 10 + 100, 10 &rarr; 100** etc. |
| `input_values_separator` | `data-input-values-separator` | ` ; ` | string | Separator for **double** values in input value property. `<input value="25;42">` |
| `disable` | `data-disable` | `false` | boolean | Locks slider and makes it inactive. Input is disabled too. Invisible to forms |
| `block` | `data-blokc` | `false` | boolean | Locks slider and makes it inactive. Input is NOT disabled. Can be send with forms |
| `extra_classes` | `data-extra-classes` | `—` | string | Traverse extra CSS-classes to sliders container |
| `scope` | `-` | `null` | object | Scope for callbacks. Pass any object |
| `onStart` | `-` | `null` | function | Callback. Is called on slider start. Gets all slider data as a 1st attribute |
| `onChange` | `-` | `null` | function | Callback. IS called on each values change. Gets all slider data as a 1st attribute |
| `onFinish` | `-` | `null` | function | Callback. Is called than user releases handle. Gets all slider data as a 1st attribute |
| `onUpdate` | `-` | `null` | function | Callback. Is called than slider is modified by external methods `update` or `reset` |



## Описание данных передаваемых в колбэки (onChange и т.д):

Результат имеет тип object и передается коллбэк первым аргументом:
```javascript
Obj: {
    "input": object,            // jQuery-link to input
    "slider": object,           // jQuery-link to sliders container
    "min": 1000,                // MIN value
    "max": 100000,              // MAX values
    "from": 10000,              // FROM value
    "from_percent": 10,         // FROM value in percents
    "from_value": 0,            // FROM index in values array (if used)
    "to": 90000,                // TO value
    "to_percent": 90,           // TO value in percents
    "to_value": 0,              // TO index in values array (if used)
    "min_pretty": "1 000",      // MIN prettified (if used)
    "max_pretty": "100 000",    // MAX prettified (if used)
    "from_pretty": "10 000",    // FROM prettified (if used)
    "to_pretty": "90 000"       // TO prettified (if used)
}
```

## Создание слайдера c параметрами

Пример
```javascript
$("#example").ionRangeSlider({
    min: 0,
    max: 10000,
    from: 1000,
    to: 9000,
    type: 'double',
    prefix: "$",
    grid: true,
    grid_num: 10
});
```

Слайдер с параметрами можно также инициализировать используя атрибуты <code>data-*</code> у тэга <code>input</code>:
```html
data-min="0"
data-max="10000"
data-from="1000"
data-to="9000"
data-type="double"
data-prefix="$"
data-grid="true"
data-grid-num="10"
```

## Публичные методы

Для того чтобы использовать публичные методы, вначале нужно записать значение слайдера в переменную::
```javascript
// Запускаем слайдер
$("#range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 1000,
    from: 200,
    to: 500,
    grid: true
});

// Записываем инстанс в переменную
var slider = $("#range").data("ionRangeSlider");

// Запускаем публичный метод
slider.reset();
```

Всего существует 3 публичных метода:
```javascript
// UPDATE - обновляет значения слайдера (можно менять любые значения)
slider.update({
    from: 300,
    to: 400
});

// RESET - сбрасывает слайдер к исходным значениям
slider.reset();

// DESTROY - убивает слайдер и восстанавливает исходный input
slider.destroy();
```

## Еще раз взглянем на демо

* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo.html" class="switch__item">Базовые настройки</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_advanced.html" class="switch__item">Расширенные настройки</a>
* <a href="http://ionden.com/a/plugins/ion.rangeSlider/demo_interactions.html" class="switch__item">Взаимодействия</a>

В демках есть примеры использования всех опций слайдера


### <a href="history.md">История обновлений</a>

***

#### Поддержите разработку плагинов серии Ion:

* Пожертвовать через сервис Pledgie: [![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

* Пожертвовать напрямую через Paypal: https://www.paypal.me/IonDen

* Пожертвовать напрямую через Яндекс.Деньги: http://yasobe.ru/na/razrabotku
