<?php

namespace App\Mail;

use App\Models\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailCodeResetPassword extends Mailable
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
        return $this->subject('Reset Password Verification Code')
            ->view('emails.send-code-reset-password')
            ->with([
                'fullName' => $this->account->full_name,
                'verificationCode' => $this->account->verify_code,
            ]);
    }
}
