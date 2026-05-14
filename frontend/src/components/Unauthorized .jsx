import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { primaryBtn, secondaryBtn } from "../styles/common";

const Unauthorized = ({ delay = 5000 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/login";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-8 text-center">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 text-4xl mb-8 border border-rose-100">
        !
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Access Denied</h1>
      <p className="text-lg text-gray-500 mb-10 max-w-md font-medium">
        You don’t have the necessary permissions to view this section.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button onClick={() => navigate('/')} className={primaryBtn}>Go to Home</button>
        <button onClick={() => navigate(redirectTo)} className={secondaryBtn}>Login Again</button>
      </div>

      <div className="mt-12 flex items-center gap-3">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Redirecting in {delay/1000}s...
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
