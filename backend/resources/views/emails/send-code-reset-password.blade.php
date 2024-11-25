<!DOCTYPE html>
<html>
<head>
    <title>Reset Password Verification Code</title>
</head>
<body>
    <p>Dear {{ $fullName }},</p>
    <p>We received a request to reset your password. Please use the verification code below to confirm your email address and reset your password:</p>
    <h3>{{ $verificationCode }}</h3>
    <p>This code will expire in 3 minutes. If you did not request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
    <p>Best regards,</p>
    <p>Your Support Team</p>
</body>
</html>
