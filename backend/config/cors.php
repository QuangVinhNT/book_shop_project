<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Áp dụng CORS cho các route bắt đầu bằng 'api/' và route của Sanctum

    'allowed_methods' => ['*'], // Cho phép tất cả HTTP methods (GET, POST, PUT, DELETE, ...)

    'allowed_origins' => ['http://localhost:3000'], // Thêm origin của frontend (chỉ định rõ ràng, không dùng '*')

    'allowed_origins_patterns' => [], // Không cần dùng pattern

    'allowed_headers' => ['*'], // Cho phép tất cả các header (ví dụ: Content-Type, Authorization, ...)

    'exposed_headers' => [], // Không cần expose thêm headers nào cả

    'max_age' => 0, // Không cache CORS response

    'supports_credentials' => true, // Cho phép gửi credentials (cookie, session)
];

