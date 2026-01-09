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
  Settings,
  Plus,
  MessageSquare,
  Image,
  FileUp,
  MoreHorizontal
} from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const quickActions = [
    { label: "Summarize", icon: FileText },
    { label: "Explain", icon: Bot },
    { label: "Quiz Me", icon: Sparkles },
    { label: "Key Points", icon: FileText },
  ];
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [chatHistory] = useState([
    { id: "1", title: "Binary Trees explained", date: "Today" },
    { id: "2", title: "SQL Query help", date: "Yesterday" },
    { id: "3", title: "OS concepts", date: "2 days ago" },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
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
    setShowWelcome(false);

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

  const handleChatFileUpload = (files: FileList | null, type: "image" | "file" | "pdf") => {
    if (!files) return;

    const attachments: ChatAttachment[] = [];

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf" || file.name.match(/\.pdf$/i);
      const isValidFile = type === "image" ? isImage : type === "pdf" ? isPdf : true;

      if (isValidFile) {
        const attachment: ChatAttachment = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: isImage ? URL.createObjectURL(file) : undefined,
        };
        attachments.push(attachment);
      } else {
        toast({
          title: "Invalid File Type",
          description: type === "image" ? "Please upload image files" : type === "pdf" ? "Please upload PDF files" : "Invalid file type",
          variant: "destructive",
        });
      }
    });

    if (attachments.length > 0) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: "",
        timestamp: new Date(),
        attachments,
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowWelcome(false);
      scrollToBottom();

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I've received your ${attachments.length > 1 ? "files" : "file"}: ${attachments.map(a => a.name).join(", ")}. How can I help you with ${attachments.length > 1 ? "these" : "this"}?`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        scrollToBottom();
      }, 1000);
    }
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
    <div className="min-h-screen flex relative overflow-hidden">
      <BackgroundOrbs />

      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-20 w-60 md:w-72 h-screen flex-shrink-0"
          >
            <div className="glass-card h-full rounded-none p-3 md:p-4 flex flex-col">
              {/* Close button for mobile */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 p-1.5 md:p-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-base md:text-lg gradient-text">LearnAI</h1>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Smart Learning</p>
                </div>
              </div>

              {/* New Chat Button */}
              <button
                onClick={() => {
                  setMessages([]);
                  setShowWelcome(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 border border-primary/30 transition-colors mb-3 md:mb-4"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">New Chat</span>
              </button>

              {/* Chat History */}
              <div className="mb-3 md:mb-4">
                <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  Chat History
                </h3>
                <div className="space-y-1">
                  {chatHistory.map((chat) => (
                    <button
                      key={chat.id}
                      className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-xs truncate">{chat.title}</p>
                      <p className="text-[10px] text-muted-foreground">{chat.date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Files */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2 md:mb-3 px-1.5 md:px-2">
                  Study Materials ({uploadedFiles.length})
                </h3>
                <div className="flex-1 overflow-y-auto space-y-1.5 md:space-y-2 pr-1.5 md:pr-2">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-6 md:py-8 text-muted-foreground">
                      <FileText className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-1.5 md:mb-2 opacity-50" />
                      <p className="text-xs md:text-sm">No files uploaded yet</p>
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <File className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm truncate">{file.name}</p>
                          <p className="text-[10px] md:text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 md:p-1 hover:bg-destructive/20 rounded"
                        >
                          <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Upload Button */}
                <div className="mt-3 md:mt-4">
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
                    className="w-full h-8 md:h-10 text-xs md:text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Upload Materials
                  </GlowButton>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border space-y-1.5 md:space-y-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-muted transition-colors text-xs md:text-sm"
                >
                  <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Profile & Progress
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-destructive/10 transition-colors text-xs md:text-sm text-destructive"
                >
                  <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-h-screen z-10 w-full">
        {/* Header */}
        <header className="glass-card rounded-none md:rounded-b-2xl p-3 md:p-4 flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 md:p-2 rounded-lg md:rounded-xl hover:bg-muted transition-colors"
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-semibold text-sm md:text-base">AI Study Assistant</h2>
            <p className="text-[10px] md:text-xs text-muted-foreground truncate">
              Ask questions about your materials
            </p>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs md:text-sm text-muted-foreground">Online</span>
          </div>
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4"
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
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="glass-card p-8 md:p-12 text-center">
                  <Upload className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary animate-bounce" />
                  <h3 className="text-base md:text-xl font-display font-semibold mb-1.5 md:mb-2">Drop your files here</h3>
                  <p className="text-muted-foreground text-sm md:text-base">PDF, DOCX, PPT supported</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Screen */}
          {showWelcome && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full py-8"
            >
              <motion.div
                className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.3)",
                    "0 0 40px hsl(var(--primary) / 0.5)",
                    "0 0 20px hsl(var(--primary) / 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-7 h-7 md:w-10 md:h-10 text-primary-foreground" />
              </motion.div>
              <h2 className="text-lg md:text-2xl font-display font-bold mb-2 text-center">
                Hi, I'm your AI Assistant
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mb-6 text-center px-4">
                Upload materials or ask me anything about your studies
              </p>
              
              {/* Quick Action Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInput(action.label + " this topic");
                      setShowWelcome(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted border border-border/50 text-xs md:text-sm transition-colors"
                  >
                    <action.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-2 md:gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary to-secondary"
                    : "bg-muted"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                )}
              </div>
              <div
                className={`max-w-[75%] md:max-w-[70%] p-3 md:p-4 rounded-xl md:rounded-2xl ${
                  message.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-ai"
                }`}
              >
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mb-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id}>
                        {attachment.type.startsWith("image/") && attachment.url ? (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="max-w-full rounded-lg max-h-48 object-cover"
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <File className="w-4 h-4 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs truncate">{attachment.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {formatFileSize(attachment.size)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {message.content && (
                  <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
                )}
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1.5 md:mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 md:gap-3"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="chat-bubble-ai p-3 md:p-4 rounded-xl md:rounded-2xl">
                <div className="flex gap-1">
                  <motion.div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary"
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
        <div className="p-2 md:p-4 flex-shrink-0 relative">
          {/* Hidden file inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleChatFileUpload(e.target.files, "image")}
            className="hidden"
          />
          <input
            ref={chatFileInputRef}
            type="file"
            multiple
            onChange={(e) => handleChatFileUpload(e.target.files, "file")}
            className="hidden"
          />

          {/* File Upload Menu */}
          <AnimatePresence>
            {showFileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-16 md:bottom-20 left-2 md:left-4 z-20"
              >
                <GlassCard className="p-2 min-w-[140px]">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        imageInputRef.current?.click();
                        setShowFileMenu(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-xs"
                    >
                      <Image className="w-3.5 h-3.5 text-primary" />
                      Image
                    </button>
                    <button
                      onClick={() => {
                        chatFileInputRef.current?.click();
                        setShowFileMenu(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-xs"
                    >
                      <FileUp className="w-3.5 h-3.5 text-primary" />
                      File
                    </button>
                    <button
                      onClick={() => {
                        chatFileInputRef.current?.click();
                        setShowFileMenu(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      PDF
                    </button>
                    <button
                      onClick={() => setShowFileMenu(false)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-xs"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5 text-primary" />
                      More
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          <GlassCard className="p-1.5 md:p-2 flex items-end gap-1.5 md:gap-2">
            <button
              onClick={() => setShowFileMenu(!showFileMenu)}
              className="p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-muted transition-colors"
            >
              <Paperclip className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
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
              className="flex-1 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground max-h-24 md:max-h-32 min-h-[36px] md:min-h-[44px] py-2 md:py-3 px-1.5 md:px-2 text-sm md:text-base"
              rows={1}
            />
            <GlowButton
              variant="primary"
              size="md"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-lg md:rounded-xl h-8 w-8 md:h-10 md:w-10 p-0 flex items-center justify-center"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </GlowButton>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default Home;
