<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <h1>Hi {{ $name }},</h1>
    <p>Please click the link below to verify your email:</p>
    <a href="{{ url('/api/verify-email/'.$token) }}">Verify Email</a>
</body>
</html>