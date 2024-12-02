import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [senderId, setSenderId] = useState(1); // Sender ID
    const [receiverId, setReceiverId] = useState(2); // Receiver ID

    // Lấy danh sách tin nhắn
    const fetchMessages = async () => {
        const response = await fetch(
            `http://localhost:8000/api/messages?sender_id=${senderId}&receiver_id=${receiverId}`
        );
        const data = await response.json();
        setMessages(data);
    };

    // Gửi tin nhắn
    const handleSendMessage = async () => {
        const response = await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: newMessage,
                sender_id: senderId,
                receiver_id: receiverId,
                type: 'text',
            }),
        });

        if (response.ok) {
            setNewMessage('');
        }
    };

    useEffect(() => {
        fetchMessages();

        // Kết nối Laravel Echo
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'your_app_key',
            cluster: 'mt1',
            forceTLS: false,
            wsHost: '127.0.0.1',
            wsPort: 6001,
        });

        // Lắng nghe sự kiện từ kênh riêng
        echo.private(`chat.${receiverId}`)
            .listen('.message.sent', (e) => {
                setMessages((prevMessages) => [...prevMessages, e.message]);
            });

        return () => {
            echo.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Chat App</h1>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <b>{msg.sender_id === senderId ? 'You' : 'Them'}:</b> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message"
                style={{ width: '80%', marginRight: '10px' }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatApp;
