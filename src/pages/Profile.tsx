import { motion } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  ArrowLeft,
  Edit,
  LogOut,
  Award,
  Target,
  Clock
} from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, studentDetails, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Mock progress data
  const progressData = {
    filesUploaded: 12,
    topicsCovered: 28,
    questionsAsked: 156,
    studyHours: 47,
    weeklyProgress: 73,
    strongAreas: ["Data Structures", "Algorithms", "Database Systems"],
    weakAreas: ["Machine Learning", "Computer Networks"],
    recentTopics: [
      { name: "Binary Trees", progress: 85 },
      { name: "SQL Queries", progress: 92 },
      { name: "Operating Systems", progress: 60 },
      { name: "Web Development", progress: 78 },
    ],
  };

  return (
    <div className="min-h-screen p-3 md:p-8 relative">
      <BackgroundOrbs />
      
      <div className="max-w-5xl mx-auto z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8"
        >
          <button
            onClick={() => navigate("/home")}
            className="p-1.5 md:p-2 rounded-lg md:rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div>
            <h1 className="text-lg md:text-3xl font-display font-bold gradient-text">Profile & Progress</h1>
            <p className="text-xs md:text-base text-muted-foreground">Track your learning journey</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-3 md:p-6">
              <div className="text-center mb-3 md:mb-6">
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-2 md:mb-4 flex items-center justify-center">
                  <span className="text-lg md:text-3xl font-display font-bold text-primary-foreground">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <h2 className="text-sm md:text-xl font-display font-semibold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm">{user?.email}</p>
              </div>

              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-muted/50">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <div>
                    <p className="text-[10px] md:text-xs text-muted-foreground">College</p>
                    <p className="text-xs md:text-sm font-medium">{studentDetails?.collegeName || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-muted/50">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <div>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Branch</p>
                    <p className="text-xs md:text-sm font-medium">{studentDetails?.branch || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-muted/50">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <div>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Year & Semester</p>
                    <p className="text-xs md:text-sm font-medium">
                      {studentDetails?.yearOfStudy || "Not set"} • {studentDetails?.semester || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 md:mt-6 space-y-1.5 md:space-y-2">
                <GlowButton variant="ghost" size="md" className="w-full h-8 md:h-10 text-xs md:text-sm">
                  <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Edit Profile
                </GlowButton>
                <GlowButton
                  variant="ghost"
                  size="md"
                  className="w-full h-8 md:h-10 text-xs md:text-sm text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Logout
                </GlowButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-3 md:space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[
                { icon: FileText, label: "Files Uploaded", value: progressData.filesUploaded, color: "from-cyan-500 to-blue-500" },
                { icon: Target, label: "Topics Covered", value: progressData.topicsCovered, color: "from-purple-500 to-pink-500" },
                { icon: Award, label: "Questions Asked", value: progressData.questionsAsked, color: "from-orange-500 to-red-500" },
                { icon: Clock, label: "Study Hours", value: progressData.studyHours, color: "from-green-500 to-emerald-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="p-2 md:p-4 text-center">
                    <div className={`w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} mx-auto mb-1.5 md:mb-2 flex items-center justify-center`}>
                      <stat.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                    </div>
                    <p className="text-lg md:text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Weekly Progress */}
            <GlassCard className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <h3 className="font-display font-semibold text-sm md:text-base flex items-center gap-1.5 md:gap-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Weekly Progress
                </h3>
                <span className="text-lg md:text-2xl font-display font-bold gradient-text">
                  {progressData.weeklyProgress}%
                </span>
              </div>
              <div className="h-2.5 md:h-4 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full progress-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressData.weeklyProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2">
                You're doing great! Keep up the momentum.
              </p>
            </GlassCard>

            {/* Recent Topics */}
            <GlassCard className="p-3 md:p-6">
              <h3 className="font-display font-semibold text-sm md:text-base mb-2 md:mb-4 flex items-center gap-1.5 md:gap-2">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Recent Topics
              </h3>
              <div className="space-y-2 md:space-y-4">
                {progressData.recentTopics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-0.5 md:mb-1">
                      <span className="text-xs md:text-sm">{topic.name}</span>
                      <span className="text-xs md:text-sm text-muted-foreground">{topic.progress}%</span>
                    </div>
                    <div className="h-1.5 md:h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full progress-gradient rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <GlassCard className="p-3 md:p-6">
                <h3 className="font-display font-semibold text-xs md:text-base mb-2 md:mb-4 text-green-400 flex items-center gap-1.5 md:gap-2">
                  <Award className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  Strong Areas
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  {progressData.strongAreas.map((area) => (
                    <div
                      key={area}
                      className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-green-500/10 border border-green-500/20 text-[10px] md:text-sm"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-3 md:p-6">
                <h3 className="font-display font-semibold text-xs md:text-base mb-2 md:mb-4 text-orange-400 flex items-center gap-1.5 md:gap-2">
                  <Target className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  Areas to Improve
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  {progressData.weakAreas.map((area) => (
                    <div
                      key={area}
                      className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-orange-500/10 border border-orange-500/20 text-[10px] md:text-sm"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
