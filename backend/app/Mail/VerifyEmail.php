<?php

namespace App\Mail;

use App\Models\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $account;
    public $verificationCode;

    public function __construct($account, $verificationCode)
    {
        $this->account = $account;
        $this->verificationCode = $verificationCode;
    }

    public function build()
    {
        return $this->subject('Verify Your Email Address')
            ->view('emails.verify-email')
            ->with([
                'fullName' => $this->account->full_name,
                'verificationCode' => $this->verificationCode,
            ]);
    }
}
