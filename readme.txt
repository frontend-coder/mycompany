
Стартовый чистый шаблон базируется на Bootstrap Grid с использованием самих популярных Javascript плагинов.


Для облегчения верстки уже создана базовая разметка шапки фиксированной шапки с местом под:
Лого
Деск-топ мобильное меню
блока с телефонами

в виде меню используется выездающее адоптивное меню, управляется обычным гамбургером



Сборка шаблона выполнятся с помощью таск-менеджера Gulp. Чтобы настроить сборку проекта необходимо выполнить следующие шаги:

скачать адхив репозитория clean-start-gulp-tamplate.
все файлы из разпакованного архива переместить в созданный каталог, в котором будет выполняться сборка проекта
запустить Git Bash Here (используйте консоль, которая установлена в вашей ОС)
в консоли набрать команду npm i
дождаться завершения установки плагинов Gulp
набрать в консоли команду gulp
дождаться открытия браузера, который установлен по умолчанию
отрыть файлы в текстовом редакторе Sublime Text 3 (или альтернативным редактором):

index.html - выполнена первичная разметка страницы
common.js (он находится в каталоге app/libs/jquery)
_header.scss - оформление первого экрана шаблона,
_allstyle.scss – выполняется оформление всех остальных элементов на странице, кроме форм связи и всплывающих окон,
_vseforms.scss - выполняется оформление всех форм обратной связи в том числе размещенных во всплывающих окнах,
_media.scss - настройка адаптивности шаблона.
_fonts.scss - подключение внешних шрифтов, его название необходимо прописать в теге body
_var.scss - в документе указываются все переменные, функции

Все файлы, в начале названий файлов которых используются символ земля " _ ", собираются в файле main.scss. Если выполняется верстка сложного шаблона, рекомендуется создать другие файлы с scss расширением, к примеру "_name.scss". Его необходимо подключить в файле main.scss.

В стартовом шаблоне уже подключены некоторые плагины Javascript, иконочный шрифт fontawesome, Bootstrap 3.3.7.

Все каталоги подключенных эллементов находятся в каталоге app/libs/
Если вы желаете подключить другие плагины, должны каталог с файлами плагина поместить в каталог app/libs/

Выполнить подключение файлов в следующих файлах:

в файле libs.scss - подключаются все файлы c разрешениями css, scss, sass
в файле gulpfile.js выполняется подключение всех js файлов подключаемых плагинов, это выполняется в блоке задачи scripts (строка 73)

Если вы какие-то плагины не используете в процессе создания шаблона закоментируете строки подключения файлов в файлах app/libs/libs.scss и  app/libs/gulpfile.js, физически файлы удалять не нужно.

Сборка в процессе верстки шаблона выполняется в каталоге app, после запуска Gulp-сборщика и запуска браузера. После сохранения изменений в файлах шаблона, будет выполняться автоматическое обновление странице браузера.

Что нужно знать для выполнения автоматической сборки проекта:

во время черновой сборки в испекторе кода вы найдете название файлов в формате "_media.scss" и так далее. Таким образом верстальщику легче проследить с помощью каких классов и в каких файлах выполнено оформление изучаемых элементов страницы.

При выполнении финальной сборки необходимо сделать несколько шагов:

для переменной var isDevelopmant значение true изменить на false
выполнить задачу gulp build
переместить содержимое каталога dist в папку сайта на хостинге.


Какие программы рекомендую установить:
Node.js — это среда для выполнения JavaScript кода в среде Windows. (обязательна к установке)
npm — это стандартный менеджер пакетов, автоматически устанавливающийся вместе с Node.js. Он используется для скачивания пакетов из облачного сервера npm, либо для загрузки пакетов на эти сервера.

Git Bash - это интерпретатор bash интегрированный с Git для Windows.
Github Desktop — утилита, имеющая гарфический интерфейс и позволяющая работать с сервисом Github без использования командной строки

Отличия библиотек jquery:
jquery 1.12 - eсли нужна поддержка IE 6-8.

Какие библиотеки и плагины были подключены к стартовому шаблону:


Bootstrap v3.3.5                           http://getbootstrap.com
equalHeights.min.js 1.5.2                  https://github.com/mattbanks/jQuery.equalHeights
Font Awesome 4.7.0                         http://fontawesome.io/     
Font Awesome Free 5.0.1                    http://fontawesome.com
Hamburgers                                 https://jonsuh.com/hamburgers
Page scroll to id Version: 1.5.8           http://manos.malihu.gr/page-scroll-to-id/
jQuery Mask Plugin v1.14.12                https://github.com/igorescobar/jQuery-Mask-Plugin
Magnific Popup - v1.1.0 - 2016-02-20       http://dimsemenov.com/plugins/magnific-popup/
jQuery mmenu v6.1.8                        http://mmenu.frebsite.nl/
jquery.nicescroll v3.7.6 InuYaksa          https://nicescroll.areaaperta.com 
Owl Carousel v2.2.1                        https://owlcarousel2.github.io/OwlCarousel2/
Swiper iDangero v4.1.0                     http://idangero.us/swiper/
parallax.js v1.5.0                         http://pixelcog.github.io/parallax.js/
jQuery Tabs v1.0.0                         https://github.com/anantajitjg/jquery-tabs
animate-css v3.5.2                         https://daneden.github.io/animate.css/
jquery.waypoints v4.0.1                    http://imakewebthings.com/waypoints/
jqBootstrapValidation v.1.3.7              http://reactiveraven.github.io/jqBootstrapValidation/
jquery.mask v.1.14.13                      https://github.com/igorescobar/jQuery-Mask-Plugin
parallax.js                                http://pixelcog.github.io/parallax.js/

Подключена к шаблону только jQuery v1.11.1, вы можете привязать к шаблону старшие версии jQuery, изменив привязку в файле index.html
  
jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license
jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license 
jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license
jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license 

Respond.js v1.4.2: min/max-width media query polyfill
@preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
@license es5-shim Copyright 2009-2014 by contributors, MIT License * see https://github.com/es-shims/es5-shim/blob/v4.0.3/LICENSE


Связаться с автором сборки:
https://www.facebook.com/frontendercode
https://github.com/frontend-coder

Skype : webrabcom
Telegram : https://t.me/frontendcoder

Портфолио
https://frontend-coder.github.io/
