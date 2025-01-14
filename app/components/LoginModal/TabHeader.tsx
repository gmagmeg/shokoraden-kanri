import { CiLogin, CiUser } from "react-icons/ci";

type TabType = 'login' | 'register';

interface TabHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      <button
        className={`
          px-4 py-2 flex items-center gap-1
          ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}
        `}
        onClick={() => onTabChange('login')}
      >
        <CiLogin />ログイン
      </button>
      <button
        className={`
          px-4 py-2 flex items-center gap-1
          ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}
        `}
        onClick={() => onTabChange('register')}
      >
        <CiUser />新規登録
      </button>
    </div>
  );
}; 