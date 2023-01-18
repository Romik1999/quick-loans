<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Помогаем получить кредит, независимо от кредитной истории.">

{{--    favicon--}}
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <title>Одобрение кредита за 1 день</title>

    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>

     @vite([
                'resources/libs/swiper/swiper-bundle.min.css',
                'resources/libs/swiper/swiper-bundle.min.js',
                'resources/sass/style.scss',
                'resources/js/app.js'
                ])

    @if(Route::currentRouteName() == 'home')
        @vite([
       'resources/js/assets/script.js'
       ])
    @endif

</head>
<body>

<div id="app">
    @yield('content')
</div>

@include('layouts._counters', [
        'counters' => [
            'facebook' =>[],
            'yandexMetrika' => [91432864],
            'mailRu' => [],
            'google' => []
            ]
            ])


</body>
</html>
