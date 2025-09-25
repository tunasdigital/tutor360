import { useContext } from "react";
import { CourseContext } from "@/context/course-context";

export default function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
