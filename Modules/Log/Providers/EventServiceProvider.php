<?php

namespace Modules\Log\Providers;

// use Illuminate\Support\ServiceProvider;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
   protected $listen = [
        'Modules\Log\Events\ActivityLog' =>[
            'Modules\Log\Listeners\ActivityLogSubmit',
        ]
   ];

}