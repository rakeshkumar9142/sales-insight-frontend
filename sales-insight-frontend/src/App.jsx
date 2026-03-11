import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !email) {
      alert("Please upload a dataset and enter your email");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const res = await fetch(
        "https://sales-insight-automator-backend.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      alert("✨ AI Insights Generated Successfully!");
      console.log(data);
    } catch (err) {
      alert("⚠️ Error generating insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-wiggle:hover {
          animation: wiggle 0.3s ease-in-out;
        }
        .bg-gradient-move {
          background: linear-gradient(-45deg, #0b1120, #1a1f35, #2d1b3a, #0b1120);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-move text-white relative overflow-hidden">
        {/* Floating particles (simple decorative circles) */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Navbar */}
        <nav className="relative flex justify-between items-center px-6 md:px-10 py-6 border-b border-gray-800/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">🐰</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              RabbitAI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs font-medium text-purple-300">
              🎯 Placement Demo
            </span>
            <p className="text-gray-400 text-sm hidden sm:block">
              AI-Powered Sales Analytics
            </p>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative text-center mt-16 md:mt-24 px-4 z-10">
          <div className="inline-block mb-4 px-4 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm">
            ⚡ Introducing RabbitAI Sales Insight
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Transform Sales Data into
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent block md:inline">
              {" "}Actionable Insights
            </span>
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Upload your sales dataset and let our AI rabbit dig out revenue drivers,
            performance trends, and executive intelligence – instantly.
          </p>

          {/* Animated rabbit mascot */}
          <div className="flex justify-center mt-8">
            <div className="relative">
              <span className="text-7xl animate-float inline-block">🐇</span>
              <span className="absolute -bottom-2 -right-2 text-2xl animate-pulse">✨</span>
            </div>
          </div>
        </div>

        {/* Upload Card */}
        <div className="relative flex justify-center mt-16 px-4 z-10">
          <div className="bg-[#1c2438]/90 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Upload Sales Dataset
            </h2>

            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 mb-6 text-center transition-all cursor-pointer
                ${dragActive ? "border-purple-400 bg-purple-500/10" : "border-gray-600 hover:border-purple-400/50"}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-4xl mb-2 block animate-wiggle">📂</span>
              {file ? (
                <p className="text-purple-300 font-medium">
                  ✅ {file.name} selected
                </p>
              ) : (
                <>
                  <p className="text-gray-300 font-medium">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    or click to browse (CSV, Excel)
                  </p>
                </>
              )}
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-[#0b1120] border border-gray-700 mb-4 focus:border-purple-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating Insights...</span>
                </>
              ) : (
                "✨ Generate AI Insights"
              )}
            </button>

            {/* Small note */}
            <p className="text-gray-500 text-xs text-center mt-4">
              We'll send the insights report to your email
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mt-28 grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto z-10">
          {[
            {
              icon: "🐰",
              title: "AI Sales Insights",
              desc: "Automatically detect revenue drivers and performance insights.",
            },
            {
              icon: "📈",
              title: "Trend Detection",
              desc: "Identify patterns in product demand and regional sales.",
            },
            {
              icon: "📊",
              title: "Executive Reports",
              desc: "Generate ready-to-use insights for decision makers.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-[#1c2438]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-purple-400/50 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-4xl mb-3 block group-hover:animate-wiggle">
                {feature.icon}
              </span>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="relative mt-28 pb-10 text-center text-gray-500 text-sm z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>Powered by</span>
            <span className="text-purple-400 font-semibold">RabbitAI</span>
            <span>+</span>
            <span className="text-indigo-400 font-semibold">Gemini</span>
            <span className="text-xl">🐇</span>
          </div>
          <p>© {new Date().getFullYear()} – Placement Demo</p>
        </footer>
      </div>
    </>
  );
}

export default App;