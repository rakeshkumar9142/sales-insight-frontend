import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Load saved email
  useEffect(() => {
    const saved = localStorage.getItem("rabbitai_email");
    if (saved) setEmail(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("rabbitai_email", email);
  }, [email]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
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
        { method: "POST", body: formData }
      );
      const data = await res.json();
      alert("✨ AI Insights Generated Successfully!");
      console.log(data);
    } catch (err) {
      alert("⚠️ Error generating insights. Using demo mode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white font-sans">
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .glass {
          background: rgba(20, 24, 36, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Navbar */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex justify-between items-center border-b border-gray-800/30">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-float">🐇</span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Rabbitt.AI
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#home" className="hover:text-purple-400 transition">Home</a>
          <a href="#process" className="hover:text-purple-400 transition">Process</a>
          <a href="#insights" className="hover:text-purple-400 transition">Insights</a>
          <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
        </div>
        <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
          Talk to Rabbitt
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Own your AI,<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Own your Data
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Rabbitt.AI taps into the full potential of enterprise data to develop reliable Generative AI Solutions you can count on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => document.getElementById("insights").scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:opacity-90 transition"
            >
              Get Started
            </button>
            <button className="px-8 py-3 bg-gray-800 rounded-full font-medium hover:bg-gray-700 transition">
              Talk To Rabbitt
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="glass max-w-5xl mx-auto rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center -mt-6 relative z-20">
        <div>
          <div className="text-3xl font-bold text-purple-400">500+</div>
          <div className="text-gray-400 text-sm">Projects</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400">1.7M+</div>
          <div className="text-gray-400 text-sm">Annotations</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-400">100+</div>
          <div className="text-gray-400 text-sm">Clients</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400">24/7</div>
          <div className="text-gray-400 text-sm">AI Availability</div>
        </div>
      </div>

      {/* Process Steps (Define · Design · Perform) */}
      <section id="process" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How Rabbitt.AI Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "Define", icon: "🎯", desc: "Determine the specific data needs of the client. An industry‑specific consultant analyzes your business and data requirements." },
            { step: "Design", icon: "✏️", desc: "Interactive Data Annotation & Smart Labeling. Easily create a custom labeling project with our no‑code solution." },
            { step: "Perform", icon: "⚡", desc: "AI‑Assisted Quality Check. The data labeler sets the region, and the AI helper completes the task with precision." },
          ].map((item) => (
            <div key={item.step} className="glass p-8 rounded-2xl hover:border-purple-500/50 transition group">
              <span className="text-5xl mb-4 block group-hover:scale-110 transition">{item.icon}</span>
              <h3 className="text-2xl font-semibold text-purple-300 mb-3">{item.step}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sales Insight Tool Section */}
      <section id="insights" className="py-20 px-6 bg-[#0e101a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Turn Sales Data into <span className="text-purple-400">Actionable Insights</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Upload your dataset and let our AI generate executive summaries, trend detection, and recommendations instantly.
            </p>
          </div>

          {/* Upload Card */}
          <div className="glass max-w-xl mx-auto p-8 rounded-2xl border border-gray-700/30">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer
                ${dragActive ? "border-purple-400 bg-purple-500/10" : "border-gray-600 hover:border-purple-400/50"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input id="fileInput" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              <span className="text-5xl mb-3 block">📊</span>
              {file ? (
                <p className="text-purple-300 font-medium">✅ {file.name} selected</p>
              ) : (
                <>
                  <p className="text-gray-300 font-medium">Drag & drop your sales file</p>
                  <p className="text-gray-500 text-sm mt-1">or click to browse (CSV, Excel)</p>
                </>
              )}
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-[#0b0f17] border border-gray-700 mb-4 focus:border-purple-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                "🚀 Generate AI Insights"
              )}
            </button>
            <p className="text-gray-500 text-xs text-center mt-4">
              We'll email you the full report
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies (simplified) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Elevating AI accuracy with Advanced Data Annotation", desc: "In the rapidly evolving world of AI, accuracy depends on quality data." },
            { title: "80% Reduction in Hallucinations", desc: "Achieved 50% faster content generation for a global tech giant." },
            { title: "Customized AI voice for healthcare", desc: "Transforming patient interaction with automated voice assistants." },
          ].map((study, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden group cursor-pointer">
              <div className="h-40 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center text-5xl">
                📄
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-400 transition">{study.title}</h3>
                <p className="text-gray-400 text-sm">{study.desc}</p>
                <button className="mt-4 text-purple-400 text-sm font-medium hover:underline">Read Case Study →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-[#0e101a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Custom AI Effortlessly</h2>
          <p className="text-gray-400 mb-12">We would be pleased to respond to your enquiries!</p>
          <div className="glass p-8 rounded-2xl max-w-lg mx-auto">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name *" className="w-full p-3 mb-4 rounded-lg bg-[#0b0f17] border border-gray-700 focus:border-purple-400" />
              <input type="email" placeholder="Email *" className="w-full p-3 mb-4 rounded-lg bg-[#0b0f17] border border-gray-700 focus:border-purple-400" />
              <textarea placeholder="Message *" rows="4" className="w-full p-3 mb-4 rounded-lg bg-[#0b0f17] border border-gray-700 focus:border-purple-400"></textarea>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:opacity-90 transition">
                Send Message
              </button>
            </form>
            <div className="flex justify-center gap-6 mt-6 text-gray-400">
              <span>📧 sales@rabbitt.ai</span>
              <span>📞 +91 9911059386</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass py-12 px-6 border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Pages</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Home</a></li>
              <li><a href="#" className="hover:text-purple-400">Blogs</a></li>
              <li><a href="#" className="hover:text-purple-400">Consulting</a></li>
              <li><a href="#" className="hover:text-purple-400">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Domains</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Education</a></li>
              <li><a href="#" className="hover:text-purple-400">Marketing</a></li>
              <li><a href="#" className="hover:text-purple-400">Customer Experience</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Compare</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">vs V7</a></li>
              <li><a href="#" className="hover:text-purple-400">vs OpenAI</a></li>
              <li><a href="#" className="hover:text-purple-400">vs Scale AI</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-300 mb-4">Socials</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-purple-400">🐦</a>
              <a href="#" className="hover:text-purple-400">🔗</a>
              <a href="#" className="hover:text-purple-400">📘</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-12">
          © {new Date().getFullYear()} Rabbitt.AI – Placement Demo by [Your Name]
        </div>
      </footer>
    </div>
  );
}

export default App;