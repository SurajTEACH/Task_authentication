const Loader = ({ size = 'lg', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-14 h-14 border-[3px]',
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-900 z-50">
      {/* Outer ring */}
      <div className="relative">
        <div
          className={`${sizes[size]} rounded-full border-brand-900 border-t-brand-500 animate-spin`}
        />
        {/* Inner glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse-slow" />
        </div>
      </div>
      {text && (
        <p className="mt-5 text-sm font-medium text-slate-400 tracking-widest uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
