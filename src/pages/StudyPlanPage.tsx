import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { courses } from "@/data/courseContent";
import { useProgress } from "@/hooks/useProgress";
import { Calendar, Clock, Target, ArrowRight, CheckCircle, BookOpen, Rocket } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

type DayPlan = {
  date: Date;
  lessons: { id: string; title: string; unit: string; duration: string }[];
  totalMinutes: number;
  isRest: boolean;
};

export default function StudyPlanPage() {
  const [courseId, setCourseId] = useState("calculus-1");
  const [hoursPerWeek, setHoursPerWeek] = useState("7");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [plan, setPlan] = useState<DayPlan[] | null>(null);
  const { isCompleted } = useProgress();

  const generatePlan = () => {
    const course = courses[courseId];
    if (!course) return;

    const allLessons = course.units.flatMap((u) =>
      u.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        unit: u.title,
        duration: l.duration,
        minutes: parseInt(l.duration) || 20,
        completed: isCompleted(l.id),
      }))
    );

    const remaining = allLessons.filter((l) => !l.completed);
    if (remaining.length === 0) {
      setPlan([]);
      return;
    }

    const totalHours = parseFloat(hoursPerWeek) || 7;
    const days = parseInt(daysPerWeek) || 5;
    const minutesPerDay = Math.floor((totalHours * 60) / days);
    const start = new Date(startDate);

    const schedule: DayPlan[] = [];
    let lessonIdx = 0;
    let currentDay = new Date(start);
    let studyDaysThisWeek = 0;
    let weekStart = startOfWeek(currentDay, { weekStartsOn: 1 });

    while (lessonIdx < remaining.length) {
      // Reset weekly counter
      const thisWeekStart = startOfWeek(currentDay, { weekStartsOn: 1 });
      if (thisWeekStart.getTime() !== weekStart.getTime()) {
        studyDaysThisWeek = 0;
        weekStart = thisWeekStart;
      }

      if (studyDaysThisWeek >= days) {
        schedule.push({ date: new Date(currentDay), lessons: [], totalMinutes: 0, isRest: true });
        currentDay = addDays(currentDay, 1);
        continue;
      }

      const dayLessons: DayPlan["lessons"] = [];
      let dayMinutes = 0;

      while (lessonIdx < remaining.length && dayMinutes + remaining[lessonIdx].minutes <= minutesPerDay + 10) {
        const l = remaining[lessonIdx];
        dayLessons.push({ id: l.id, title: l.title, unit: l.unit, duration: l.duration });
        dayMinutes += l.minutes;
        lessonIdx++;
      }

      // If no lessons fit but we still have remaining, force at least one
      if (dayLessons.length === 0 && lessonIdx < remaining.length) {
        const l = remaining[lessonIdx];
        dayLessons.push({ id: l.id, title: l.title, unit: l.unit, duration: l.duration });
        dayMinutes += l.minutes;
        lessonIdx++;
      }

      schedule.push({ date: new Date(currentDay), lessons: dayLessons, totalMinutes: dayMinutes, isRest: false });
      studyDaysThisWeek++;
      currentDay = addDays(currentDay, 1);
    }

    setPlan(schedule);
  };

  const course = courses[courseId];
  const totalLessons = course ? course.units.flatMap((u) => u.lessons).length : 0;
  const completedCount = course
    ? course.units.flatMap((u) => u.lessons).filter((l) => isCompleted(l.id)).length
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="w-7 h-7 text-cosmos-cyan" />
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">Study Plan Generator</h1>
        </div>
        <p className="text-muted-foreground mb-10">Get a personalized day-by-day schedule based on your goals and availability.</p>

        {/* Config Form */}
        <div className="card-cosmos rounded-xl p-6 border border-secondary mb-8">
          <h2 className="font-display font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-cosmos-gold" /> Configure Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course selection */}
            <div>
              <Label className="text-sm font-semibold text-foreground mb-2 block">Course Goal</Label>
              <RadioGroup value={courseId} onValueChange={setCourseId} className="space-y-2">
                {Object.values(courses).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-secondary hover:bg-secondary/30 transition-colors">
                    <RadioGroupItem value={c.id} id={c.id} />
                    <Label htmlFor={c.id} className="cursor-pointer text-sm text-foreground">{c.title}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-5">
              {/* Hours per week */}
              <div>
                <Label htmlFor="hours" className="text-sm font-semibold text-foreground mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1.5" />Hours per Week
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={40}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="bg-secondary/40 border-secondary"
                />
              </div>

              {/* Days per week */}
              <div>
                <Label htmlFor="days" className="text-sm font-semibold text-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1.5" />Study Days per Week
                </Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  max={7}
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="bg-secondary/40 border-secondary"
                />
              </div>

              {/* Start date */}
              <div>
                <Label htmlFor="start" className="text-sm font-semibold text-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1.5" />Start Date
                </Label>
                <Input
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-secondary/40 border-secondary"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 p-4 rounded-lg bg-secondary/30 border border-secondary flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">{totalLessons - completedCount}</span> lessons remaining in <span className="text-foreground font-semibold">{course?.title}</span>
            </div>
            <Button variant="cosmos" onClick={generatePlan}>
              Generate Plan <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Generated Plan */}
        {plan !== null && (
          <div className="space-y-3">
            {plan.length === 0 ? (
              <div className="card-cosmos rounded-xl p-8 border border-secondary text-center">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">All Done!</h3>
                <p className="text-muted-foreground">You've completed every lesson in this course. 🎉</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-xl text-foreground">Your {plan.filter((d) => !d.isRest).length}-Day Schedule</h2>
                  <span className="text-xs text-muted-foreground">
                    {format(plan[0].date, "MMM d")} – {format(plan[plan.length - 1].date, "MMM d, yyyy")}
                  </span>
                </div>
                {plan.map((day, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 border transition-all ${
                      day.isRest
                        ? "border-secondary/50 bg-secondary/10 opacity-60"
                        : "card-cosmos border-secondary hover:border-cosmos-cyan/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cosmos-cyan/10 text-cosmos-cyan border border-cosmos-cyan/30">
                          Day {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{format(day.date, "EEEE, MMM d")}</span>
                      </div>
                      {day.isRest ? (
                        <span className="text-xs text-muted-foreground italic">Rest Day</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">{day.totalMinutes} min</span>
                      )}
                    </div>
                    {!day.isRest && (
                      <div className="ml-1 space-y-1.5">
                        {day.lessons.map((l) => (
                          <div key={l.id} className="flex items-center gap-2 text-sm">
                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-foreground">{l.title}</span>
                            <span className="text-xs text-muted-foreground">· {l.unit} · {l.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
