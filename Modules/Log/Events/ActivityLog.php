<?php

namespace Modules\Log\Events;

use Illuminate\Queue\SerializesModels;
use Auth;
class ActivityLog
{
    use SerializesModels;
    public $user;
    public $log_type;
    public $client_ip;
    public $reference;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($log_type,$reference=NULL)
    {
        $this->user = Auth::guard('admin')->user();
        $this->log_type = $log_type;
        $this->reference = $reference;
        $this->client_ip = \Request::ip();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
