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
    <div className="min-h-screen flex relative bg-[#0a0a0f]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-fuchsia-950/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-20 w-64 h-screen"
          >
            <div className="h-full rounded-none md:rounded-r-xl p-3 flex flex-col bg-[#111118]/90 backdrop-blur-xl border-r border-white/5">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-4 p-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="font-medium text-sm text-white/90">LearnAI</h1>
                  <p className="text-[10px] text-white/40 font-light">Smart Learning</p>
                </div>
              </div>

              {/* Academic Info */}
              <div className="p-3 mb-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-[10px] text-violet-400/80 font-light mb-0.5">Academic</p>
                <p className="text-xs text-white/70 font-light">{studentDetails?.branch}</p>
                <p className="text-[10px] text-white/40 font-light mt-0.5">
                  {studentDetails?.yearOfStudy} • {studentDetails?.semester}
                </p>
              </div>

              {/* Uploaded Files */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <h3 className="text-[10px] font-light text-white/40 mb-2 px-1">
                  Materials ({uploadedFiles.length})
                </h3>
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-6 text-white/30">
                      <FileText className="w-8 h-8 mx-auto mb-1.5 opacity-40" />
                      <p className="text-[10px] font-light">No files yet</p>
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
                      >
                        <File className="w-3 h-3 text-violet-400/70 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] truncate text-white/60 font-light">{file.name}</p>
                          <p className="text-[9px] text-white/30 font-light">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-500/20 rounded"
                        >
                          <X className="w-3 h-3 text-red-400/70" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Upload Button */}
                <div className="mt-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/20 text-violet-300 text-xs font-light transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    Upload
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors text-[11px] text-white/50 font-light"
                >
                  <Settings className="w-3 h-3" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/10 transition-colors text-[11px] text-red-400/70 font-light"
                >
                  <LogOut className="w-3 h-3" />
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
        <header className="p-3 flex items-center gap-3 bg-[#111118]/80 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-white/50"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-light text-white/90">AI Assistant</h2>
            <p className="text-[10px] text-white/40 font-light">
              Ask about your materials
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/40 font-light">Online</span>
          </div>
          {/* Profile Pic & Name - Right Side */}
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="text-right">
              <p className="text-xs font-light text-white/80">{user?.firstName} {user?.lastName}</p>
              <p className="text-[10px] text-violet-400/70 font-light">{studentDetails?.branch}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white text-xs font-medium">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-3 space-y-3"
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
                className="fixed inset-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="p-8 text-center rounded-xl bg-[#111118] border border-violet-500/30">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-violet-400 animate-bounce" />
                  <h3 className="text-sm font-light mb-1 text-white/90">Drop files here</h3>
                  <p className="text-[10px] text-white/40 font-light">PDF, DOCX, PPT</p>
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
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-violet-500 to-fuchsia-500"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-violet-400" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-violet-500/90 to-fuchsia-500/90 text-white"
                    : "bg-white/5 border border-white/10 text-white/70"
                }`}
              >
                <p className="whitespace-pre-wrap text-xs font-light leading-relaxed">{message.content}</p>
                <p className={`text-[9px] mt-1.5 font-light ${message.role === "user" ? "text-white/60" : "text-white/30"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="flex gap-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
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
        <div className="p-3">
          <div className="p-1.5 flex items-end gap-1.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Paperclip className="w-4 h-4 text-white/40" />
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
              placeholder="Ask about your materials..."
              className="flex-1 bg-transparent resize-none outline-none text-white/80 placeholder:text-white/30 max-h-24 min-h-[36px] py-2 px-1.5 text-xs font-light"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
