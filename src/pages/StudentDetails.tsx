import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calendar, Building2, ArrowRight } from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlowInput } from "@/components/ui/GlowInput";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const semesterOptions = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"];
const branchOptions = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Data Science",
  "Artificial Intelligence",
  "Other",
];

const StudentDetails = () => {
  const [collegeName, setCollegeName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { saveStudentDetails, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!collegeName || !yearOfStudy || !semester || !branch) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      saveStudentDetails({ collegeName, yearOfStudy, semester, branch });
      toast({
        title: "Profile Complete!",
        description: "Welcome to your personalized learning experience",
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BackgroundOrbs />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <GlassCard className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold gradient-text mb-2">
              Hello, {user?.firstName || "Student"}!
            </h1>
            <p className="text-muted-foreground">
              Tell us about your academic journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <GlowInput
                type="text"
                placeholder="College / University Name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="pl-12"
              />
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="relative">
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-background text-muted-foreground">
                  Select Year of Study
                </option>
                {yearOptions.map((year) => (
                  <option key={year} value={year} className="bg-background">
                    {year}
                  </option>
                ))}
              </select>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="relative">
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-background text-muted-foreground">
                  Select Semester
                </option>
                {semesterOptions.map((sem) => (
                  <option key={sem} value={sem} className="bg-background">
                    {sem}
                  </option>
                ))}
              </select>
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-background text-muted-foreground">
                  Select Branch / Department
                </option>
                {branchOptions.map((b) => (
                  <option key={b} value={b} className="bg-background">
                    {b}
                  </option>
                ))}
              </select>
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <GlowButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </GlowButton>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default StudentDetails;
