<?php

namespace App\Exceptions;

use App\Http\Controllers\Traits\Functions;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    use Functions;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            $model = (explode("\\",$exception->getModel()));
            $model = end($model);
        return $this->jsonError(__('strings.model_not_found',['model'=>$model]));
        }
        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->jsonMethodNotAllowed($exception->getMessage());
        }
        if (($exception instanceof ErrorException) && (config('constants.appMode') !== 'local')) {
            return $this->jsonInternalServerError($exception->getMessage());
        }
        return parent::render($request, $exception);
    }
}
