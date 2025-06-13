import { useState } from 'react';
import axios from 'axios';
import { setToken } from './axiosInstance.ts';

interface PasswordInputProps {
    onSuccess: (password: string) => void;
}

export default function PasswordInput({ onSuccess }: PasswordInputProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        axios.get('/api', {
            headers: {
                'x-access-token' : password
            }
        })
        .then(() => {
            setToken(password);
            setError('');
            onSuccess(password);
        })
        .catch(() => {
            setError('비밀번호가 틀렸습니다.');
        });
    };

    return (
        <div className="text-center p-4">
        <h2 className="text-xl mb-2">🔐 비밀번호를 입력하세요</h2>
        <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2"
        />
        <button
            onClick={handleLogin}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
            확인
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}