import { useState } from 'react';
import Calendar from "./Calendar.tsx";
import PasswordInput from './passwordInput.tsx';

function App() {
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">CalGal 📅</div>
        <div className="text-sm text-gray-500">Keep your days remembered.</div>
        <button onClick={() => setShowPasswordInput(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
          🔐 로그인
        </button>
      </header>

      {/* 비밀번호 입력 모달 */}
      {showPasswordInput && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <PasswordInput
              onSuccess={(pwd) => {
                setPassword(pwd);
                setShowPasswordInput(false);
              }}
            />
            <button
              onClick={() => setShowPasswordInput(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 - Calendar */}
      <main className="flex-grow flex items-center justify-center mb-4">
        <Calendar password={password} />
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-100 text-sm text-gray-500 p-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <div>&copy; 2025 CalGal. All rights reserved.</div>
          <div>
            Contact: <a href="mailto:newyoung124@naver.com" className="text-blue-500 hover:underline">newyoung124@naver.com</a>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/youngG124" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href="https://blog.naver.com/newyoung124" className="hover:underline">Blog</a>
            <a href="https://www.instagram.com/practicalsinn/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;