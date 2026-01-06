import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  FileText, 
  X, 
  Sparkles, 
  User, 
  Bot,
  Upload,
  File,
  Menu,
  LogOut,
  Settings
} from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! 👋 I'm your AI learning assistant. Upload your study materials and I'll help you understand them better. Ask me anything about your subjects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, studentDetails, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on your ${studentDetails?.branch || "course"} curriculum for ${studentDetails?.semester || "this semester"}, I can help you understand this topic better. ${uploadedFiles.length > 0 ? `I've analyzed your uploaded materials (${uploadedFiles.map(f => f.name).join(", ")}) and found relevant information.` : "Upload your study materials for personalized explanations!"}\n\nHere's a detailed explanation:\n\n${input.includes("?") ? "Great question! " : ""}This concept is fundamental to your studies. Let me break it down step by step...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      scrollToBottom();
    }, 1500);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/vnd.ms-powerpoint",
    ];

    Array.from(files).forEach((file) => {
      if (allowedTypes.includes(file.type) || file.name.match(/\.(pdf|docx|doc|pptx|ppt)$/i)) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
        toast({
          title: "File Uploaded",
          description: `${file.name} has been added to your study materials`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload PDF, DOCX, or PPT files",
          variant: "destructive",
        });
      }
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <BackgroundOrbs />

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-20 w-72 h-screen"
          >
            <div className="h-full rounded-none md:rounded-r-2xl p-4 flex flex-col bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6 p-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">LearnAI</h1>
                  <p className="text-xs text-slate-400">Smart Learning</p>
                </div>
              </div>

              {/* Academic Info Card - No Profile Pic */}
              <div className="p-4 mb-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-cyan-400 font-medium mb-1">Academic Details</p>
                <p className="text-sm text-slate-300">{studentDetails?.branch}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {studentDetails?.yearOfStudy} • {studentDetails?.semester}
                </p>
              </div>

              {/* Uploaded Files */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <h3 className="text-sm font-medium text-slate-400 mb-3 px-2">
                  Study Materials ({uploadedFiles.length})
                </h3>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No files uploaded yet</p>
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/30 transition-colors group"
                      >
                        <File className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate text-slate-300">{file.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Upload Button */}
                <div className="mt-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <GlowButton
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Materials
                  </GlowButton>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-sm text-slate-300"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Profile & Progress
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-sm text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-h-screen z-10">
        {/* Header */}
        <header className="rounded-none md:rounded-b-2xl p-4 flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-slate-800 transition-colors text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-display font-semibold text-white">AI Study Assistant</h2>
            <p className="text-xs text-slate-400">
              Ask questions about your uploaded materials
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
            <span className="text-sm text-slate-400">Online</span>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
            <div className="text-right">
              <p className="font-medium text-sm text-white">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-cyan-400">{studentDetails?.branch}</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag Overlay */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="p-12 text-center rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-bounce" />
                  <h3 className="text-xl font-display font-semibold mb-2 text-white">Drop your files here</h3>
                  <p className="text-slate-400">PDF, DOCX, PPT supported</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-cyan-400" />
                )}
              </div>
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800/80 border border-slate-700/50 text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === "user" ? "text-cyan-100" : "text-slate-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4">
          <div className="p-2 flex items-end gap-2 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-lg">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Paperclip className="w-5 h-5 text-slate-400" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your study materials..."
              className="flex-1 bg-transparent resize-none outline-none text-white placeholder:text-slate-500 max-h-32 min-h-[44px] py-3 px-2"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
