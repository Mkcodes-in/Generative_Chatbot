import ChatSection from "../component/ChatSection";
import Header from "../component/Header";
import InputField from "../component/InputField";
import UseChat from "../hooks/UseChat";
import { UseTheme } from "../hooks/UseTheme";

function Dashboard({session}) {
  const { theme } = UseTheme();
  const { state } = UseChat();
  const isEmpty = state?.length === 0;
  
  return (
    <div className={`max-7xl mx-auto h-screen flex flex-col transition-colors duration-300 ease-in-out justify-center ${theme ? "bg-[#212121]" : "bg-gray-50"}`}>
      {/* Header */}
      <Header
      session={session}
      />

      {/* Main Content */}
      <div className={`flex-grow flex overflow-hidden ${isEmpty ? "items-center justify-center" : "flex-col"}`}>
        {isEmpty ? (
          <div className="w-full px-4 flex flex-col items-center justify-center space-y-8">
            <div className="text-white font-sans text-center space-y-2">
              <h1 className="text-4xl font-semibold">Hello, {session.user.user_metadata.name  } 👋</h1>
              <p className="text-lg mb-2">What can I help you with today?</p>
            </div>
            <InputField 
            session={session}
            />
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto py-6 space-y-2">
              <ChatSection />
            </div>
            <InputField />
          </>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
