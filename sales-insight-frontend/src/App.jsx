import { useState } from "react";

export default function App() {

  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file || !email) {
      alert("Please upload file and enter email");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {

      setLoading(true);

      const res = await fetch(
        "https://sales-insight-automator-backend-9eg7.onrender.com/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      setResult(JSON.stringify(data, null, 2));

    } catch (error) {

      setResult("Error generating AI insights");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#020617] to-black text-white flex flex-col items-center">

      <div className="w-full flex justify-between items-center px-10 py-6 border-b border-gray-700">

        <h1 className="text-2xl font-bold text-purple-400">
          RabbittAI Sales Insight
        </h1>

        <p className="text-sm text-gray-300">
          AI Powered Sales Analytics
        </p>

      </div>


      <div className="text-center mt-20 max-w-3xl">

        <h1 className="text-5xl font-bold leading-tight">

          Transform Sales Data into
          <span className="text-purple-400"> AI Insights</span>

        </h1>

        <p className="text-gray-400 mt-6">

          Upload your sales dataset and let AI generate executive insights,
          trends, and performance analysis instantly.

        </p>

      </div>


      <div className="bg-[#1e293b] p-10 rounded-xl shadow-lg mt-16 w-[500px] border border-gray-700">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Upload Sales Dataset
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 bg-gray-800 p-3 rounded text-white border border-gray-600"
        />

        <button
          onClick={uploadFile}
          className="w-full bg-purple-500 p-3 rounded font-semibold"
        >
          {loading ? "Analyzing Dataset..." : "Generate AI Insights"}
        </button>

      </div>


      {result && (

        <div className="mt-12 max-w-3xl bg-[#1e293b] p-8 rounded-xl border border-gray-700">

          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            AI Sales Insights
          </h2>

          <pre className="text-gray-300 whitespace-pre-wrap">
            {result}
          </pre>

        </div>

      )}

    </div>

  );
}