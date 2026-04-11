import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courseContent";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Users, BookOpen, TrendingUp, AlertTriangle,
  BarChart2, GraduationCap, Clock, Target,
} from "lucide-react";

// Simulated class data
const studentNames = ["Alyssa M.", "Ben T.", "Carlos R.", "Diana K.", "Eli W.", "Fatima N.", "Greg H.", "Hannah L.", "Ivan P.", "Julia S.", "Kevin O.", "Luna Z."];

function generateStudents(courseId: string) {
  const course = courses[courseId];
  if (!course) return [];
  const allLessons = course.units.flatMap(u => u.lessons);
  return studentNames.map((name, i) => {
    const completedCount = Math.floor(Math.random() * (allLessons.length + 1));
    const quizScore = Math.floor(40 + Math.random() * 60);
    const level = quizScore >= 80 ? "Advanced" : quizScore >= 60 ? "Intermediate" : "Beginner";
    const weakUnits = course.units
      .filter(() => Math.random() > 0.6)
      .map(u => u.title);
    return {
      id: i,
      name,
      completedLessons: completedCount,
      totalLessons: allLessons.length,
      progress: Math.round((completedCount / allLessons.length) * 100),
      quizScore,
      level,
      weakUnits,
      lastActive: `${Math.floor(Math.random() * 7) + 1}d ago`,
      avgTimePerLesson: `${Math.floor(15 + Math.random() * 30)} min`,
    };
  });
}

const COLORS = [
  "hsl(191 97% 55%)", "hsl(43 96% 56%)", "hsl(174 72% 45%)",
  "hsl(280 80% 60%)", "hsl(340 75% 55%)", "hsl(120 60% 50%)",
];

export default function TeacherDashboardPage() {
  const courseIds = Object.keys(courses);
  const [selectedCourse, setSelectedCourse] = useState(courseIds[0]);
  const course = courses[selectedCourse];
  const [students] = useState(() => {
    const map: Record<string, ReturnType<typeof generateStudents>> = {};
    courseIds.forEach(id => { map[id] = generateStudents(id); });
    return map;
  });

  const currentStudents = students[selectedCourse] || [];
  const avgProgress = Math.round(currentStudents.reduce((s, st) => s + st.progress, 0) / currentStudents.length);
  const avgQuiz = Math.round(currentStudents.reduce((s, st) => s + st.quizScore, 0) / currentStudents.length);
  const atRisk = currentStudents.filter(s => s.progress < 30 || s.quizScore < 50);
  const levelDist = [
    { name: "Beginner", value: currentStudents.filter(s => s.level === "Beginner").length },
    { name: "Intermediate", value: currentStudents.filter(s => s.level === "Intermediate").length },
    { name: "Advanced", value: currentStudents.filter(s => s.level === "Advanced").length },
  ];

  // Per-unit completion rates
  const unitCompletion = course.units.map(unit => {
    const lessonIds = unit.lessons.map(l => l.id);
    const totalPossible = lessonIds.length * currentStudents.length;
    const totalCompleted = currentStudents.reduce((sum, s) => {
      const completed = Math.min(s.completedLessons, lessonIds.length);
      return sum + Math.floor(completed * (Math.random() * 0.3 + 0.7));
    }, 0);
    return { unit: `U${unit.unit}`, name: unit.title, rate: Math.round((totalCompleted / totalPossible) * 100) };
  });

  // Weak concepts aggregation
  const weakConceptMap: Record<string, number> = {};
  currentStudents.forEach(s => s.weakUnits.forEach(w => { weakConceptMap[w] = (weakConceptMap[w] || 0) + 1; }));
  const weakConcepts = Object.entries(weakConceptMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([concept, count]) => ({ concept, count }));

  // Radar chart: class strengths
  const radarData = course.units.map(u => ({
    subject: u.title.length > 15 ? u.title.slice(0, 15) + "…" : u.title,
    score: Math.floor(50 + Math.random() * 50),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Monitor class performance and identify learning gaps</p>
          </div>
          {/* Course Selector */}
          <div className="flex gap-2 flex-wrap">
            {courseIds.map(id => (
              <Button
                key={id}
                variant={selectedCourse === id ? "cosmos" : "cosmosOutline"}
                size="sm"
                onClick={() => setSelectedCourse(id)}
                className="text-xs"
              >
                {courses[id].title}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Students", value: currentStudents.length, icon: Users, color: "text-cosmos-cyan" },
            { label: "Avg Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "text-cosmos-teal" },
            { label: "Avg Quiz Score", value: `${avgQuiz}%`, icon: Target, color: "text-cosmos-gold" },
            { label: "At-Risk", value: atRisk.length, icon: AlertTriangle, color: "text-red-400" },
          ].map(stat => (
            <div key={stat.label} className="card-cosmos rounded-xl p-5 border border-secondary">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
              </div>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Level Distribution */}
          <div className="card-cosmos rounded-xl p-6 border border-secondary">
            <h2 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-muted-foreground" /> Student Level Distribution
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={levelDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                  {levelDist.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Unit Completion Rates */}
          <div className="card-cosmos rounded-xl p-6 border border-secondary">
            <h2 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-muted-foreground" /> Unit Completion Rates
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={unitCompletion}>
                <XAxis dataKey="unit" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", borderRadius: 8, fontSize: 12 }} formatter={(val: number) => `${val}%`} />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {unitCompletion.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Class Strength Radar */}
          <div className="card-cosmos rounded-xl p-6 border border-secondary">
            <h2 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" /> Class Strengths by Topic
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                <Radar name="Avg Score" dataKey="score" stroke="hsl(191 97% 55%)" fill="hsl(191 97% 55%)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Weak Concepts */}
          <div className="card-cosmos rounded-xl p-6 border border-secondary">
            <h2 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Common Weak Areas
            </h2>
            {weakConcepts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No weak areas detected — great job!</p>
            ) : (
              <div className="space-y-3">
                {weakConcepts.map(wc => (
                  <div key={wc.concept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{wc.concept}</span>
                      <span className="text-red-400 font-semibold">{wc.count} students</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(wc.count / currentStudents.length) * 100}%`,
                          background: "linear-gradient(90deg, hsl(340 75% 55%), hsl(0 70% 50%))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Student Table */}
        <div className="card-cosmos rounded-xl border border-secondary overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" /> Student Roster — {course.title}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                  {["Student", "Level", "Progress", "Quiz", "Lessons", "Avg Time", "Last Active", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStudents.map(s => (
                  <tr key={s.id} className="border-b hover:bg-secondary/30 transition-colors" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        s.level === "Advanced" ? "bg-cosmos-cyan/10 text-cosmos-cyan border border-cosmos-cyan/30" :
                        s.level === "Intermediate" ? "bg-cosmos-gold/10 text-cosmos-gold border border-cosmos-gold/30" :
                        "bg-red-500/10 text-red-400 border border-red-500/30"
                      }`}>
                        {s.level}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
                          <div className="h-full rounded-full" style={{
                            width: `${s.progress}%`,
                            background: s.progress >= 70 ? "hsl(191 97% 55%)" : s.progress >= 40 ? "hsl(43 96% 56%)" : "hsl(0 70% 50%)",
                          }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground">{s.quizScore}%</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.completedLessons}/{s.totalLessons}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.avgTimePerLesson}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.lastActive}</td>
                    <td className="px-4 py-3">
                      {s.progress < 30 || s.quizScore < 50 ? (
                        <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> At Risk
                        </span>
                      ) : s.progress >= 70 ? (
                        <span className="text-xs font-semibold text-cosmos-cyan">On Track</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
