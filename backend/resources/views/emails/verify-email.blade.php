<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email</title>
</head>
<body>
    <p>Dear {{ $fullName }},</p>
    <p>Thank you for registering. Please use the verification code below to verify your email address:</p>
    <h3>{{ $verificationCode }}</h3>
    <p>This code will expire in 3 minutes.</p>
    <p>Thank you!</p>
</body>
</html>