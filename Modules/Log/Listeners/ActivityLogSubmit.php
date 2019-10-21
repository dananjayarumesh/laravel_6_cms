<?php

namespace Modules\Log\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Log\Events\ActivityLog;
use Modules\Log\Entities\Log;
class ActivityLogSubmit
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(ActivityLog $event)
    {
        // dd($event->client_ip);
        $log = new Log();
        $log->user_id = $event->user->id;
        $log->ip = $event->client_ip;
        $log->log_type = $event->log_type;

        if($event->reference){
        $log->reference = $event->reference;
        }

        $log->save();
    }
}
