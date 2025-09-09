import { Play } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ModuleExpansionIcon } from "./ModuleExpansionIcon";
import { LessonRow } from "./LessonRow";

interface ModuleCardProps {
  module: {
    id: string | number;
    title: string;
    totalLessons: number;
    completedLessons: number;
    locked: boolean;
    lessons: any[];
  };
  index: number;
  isExpanded: boolean;
  onToggle: (moduleId: string | number) => void;
  onWatchNow: (moduleId: number, lessonId: number) => void;
  onAssignmentClick: (lessonTitle: string, assignmentTitle: string, assignmentSubmitted: boolean, assignmentId?: string) => void;
}

const getModuleColorScheme = (moduleIndex: number) => {
  const schemes = [
    { bg: "bg-blue-50", border: "border-blue-200", accent: "text-blue-700" },
    { bg: "bg-green-50", border: "border-green-200", accent: "text-green-700" },
    { bg: "bg-purple-50", border: "border-purple-200", accent: "text-purple-700" },
    { bg: "bg-orange-50", border: "border-orange-200", accent: "text-orange-700" },
    { bg: "bg-red-50", border: "border-red-200", accent: "text-red-700" }
  ];
  return schemes[moduleIndex % schemes.length];
};

export const ModuleCard = ({ 
  module, 
  index, 
  isExpanded, 
  onToggle, 
  onWatchNow, 
  onAssignmentClick 
}: ModuleCardProps) => {
  const colorScheme = getModuleColorScheme(index);
  const totalDuration = module.lessons.reduce((acc, lesson) => 
    acc + (parseInt(lesson.duration) || 0), 0
  );

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-300 ${
      module.locked 
        ? 'border-gray-200 opacity-60' 
        : `${colorScheme.border} hover:shadow-md`
    }`}>
      <Collapsible open={isExpanded} onOpenChange={() => onToggle(module.id)}>
        <CollapsibleTrigger 
          className={`w-full p-6 flex items-center justify-between transition-all duration-300 rounded-t-lg ${
            module.locked ? 'cursor-not-allowed' : `hover:${colorScheme.bg}`
          }`}
          disabled={module.locked}
        >
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
              module.locked 
                ? 'bg-gray-100 text-gray-400'
                : `${colorScheme.bg} ${colorScheme.accent} hover:scale-105`
            }`}>
              <Play className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className={`text-lg font-semibold ${
                module.locked ? 'text-muted-foreground' : 'text-foreground'
              }`}>
                {module.title}
                {module.locked && <span className="ml-2 text-sm font-normal">(Locked)</span>}
              </h3>
              <p className="text-sm text-muted-foreground">
                {module.completedLessons}/{module.totalLessons} completed • {totalDuration} min
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {module.totalLessons} lessons
              </div>
              <div className="text-xs text-muted-foreground">
                {module.totalLessons > 0 ? 'Track progress' : 'No lessons'}
              </div>
            </div>
            <div className="p-2 hover:bg-white/50 rounded-full transition-all duration-300">
              <ModuleExpansionIcon moduleIndex={index} isExpanded={isExpanded} />
            </div>
          </div>
        </CollapsibleTrigger>
      
        <CollapsibleContent>
          <div className="border-t border-border">
            <div className="p-6 space-y-4">
              {module.lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={module.id}
                  moduleLocked={module.locked}
                  onWatchNow={onWatchNow}
                  onAssignmentClick={onAssignmentClick}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};