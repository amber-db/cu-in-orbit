import { useState, useCallback } from "react";
import { courses } from "@/data/courseContent";

export type Progress = {
  completedLessons: string[]; // lesson IDs
};

const STORAGE_KEY = "orbit_progress";

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch {}
  return { completedLessons: [] };
}

function saveProgress(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  const markComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
      saveProgress(next);
      return next;
    });
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = { ...prev, completedLessons: prev.completedLessons.filter((id) => id !== lessonId) };
      saveProgress(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress]
  );

  const getCourseStats = useCallback(
    (courseId: string) => {
      const course = courses[courseId];
      if (!course) return { total: 0, completed: 0, pct: 0 };
      const allIds = course.units.flatMap((u) => u.lessons.map((l) => l.id));
      const completed = allIds.filter((id) => progress.completedLessons.includes(id)).length;
      return { total: allIds.length, completed, pct: allIds.length ? Math.round((completed / allIds.length) * 100) : 0 };
    },
    [progress]
  );

  const getUnitStats = useCallback(
    (courseId: string, unitIdx: number) => {
      const course = courses[courseId];
      if (!course) return { total: 0, completed: 0, pct: 0 };
      const unit = course.units[unitIdx];
      if (!unit) return { total: 0, completed: 0, pct: 0 };
      const ids = unit.lessons.map((l) => l.id);
      const completed = ids.filter((id) => progress.completedLessons.includes(id)).length;
      return { total: ids.length, completed, pct: ids.length ? Math.round((completed / ids.length) * 100) : 0 };
    },
    [progress]
  );

  const resetProgress = useCallback(() => {
    const empty: Progress = { completedLessons: [] };
    saveProgress(empty);
    setProgress(empty);
  }, []);

  return { progress, markComplete, markIncomplete, isCompleted, getCourseStats, getUnitStats, resetProgress };
}
