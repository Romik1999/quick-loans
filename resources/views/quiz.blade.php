@extends('layouts.app')

@section('content')
    <section class="quiz" id="quiz">
        <div class="container">

            <quiz-app ref="quiz"></quiz-app>

            <last-step></last-step>

            <thanks-quiz></thanks-quiz>

        </div>
    </section>
@endsection
