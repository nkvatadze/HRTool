<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Response as HTTPResponse;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success',
            fn(?array $data = null, int $code = HTTPResponse::HTTP_OK) => response()->json($data, $code));

        Response::macro('fail',
            fn(string|array $error, int $code = HTTPResponse::HTTP_BAD_REQUEST) => response()->json([
                'errors' => $error
            ], $code)
        );
    }
}
