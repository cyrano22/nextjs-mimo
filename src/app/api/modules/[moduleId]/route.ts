import { LESSONS } from '@/data/lessons';
import { NextResponse } from 'next/server'; // Import NextResponse for typed responses

// Define or import your Lesson type
interface Lesson {
  id: string;
  title: string;
  description?: string;
  difficulty?: string;
  duration?: number;
  content?: string;
  example?: object;
  exercise?: object;
  quiz?: object;
  project?: object;
  tags?: string[];
  prerequisites?: string[];
}

// Define the structure for individual lessons within the module response
interface ModuleLessonInfo {
  id: number;
  title: string;
  duration?: number;
  completed: boolean;
}

// Define the structure for the overall module data response
interface ModuleData {
  id: string;
  title: string;
  description: string;
  level: string;
  lessons: ModuleLessonInfo[];
  duration: string;
  totalCompletedLessons: number;
}

export async function GET(
  request: Request, 
  { params }: { params: { moduleId: string } }
): Promise<NextResponse<ModuleData | { error: string }>> { // Explicit return type
  const { moduleId } = params;
  
  // Convertir moduleId en nombre
  const moduleNumber = parseInt(moduleId, 10); // Added radix 10
  
  // Vérifier si le moduleId est valide (par exemple, entre 1 et 8, adjust as needed)
  // You might want to derive the max module number dynamically if LESSONS can change.
  const maxModuleId = 8; // Example: Assuming you have up to 8 modules
  if (isNaN(moduleNumber) || moduleNumber < 1 || moduleNumber > maxModuleId) {
    return NextResponse.json({ error: 'Module ID invalide' }, { status: 400 });
  }

  // Récupérer toutes les leçons du module
  const moduleLessons: Lesson[] = Object.values(LESSONS)
    .filter((lesson: unknown): lesson is Lesson => { // Type guard or cast
      // Ensure 'lesson' is treated as 'Lesson' for type checking
      // This assumes LESSONS contains objects that conform to the Lesson interface
      const l = lesson as Lesson; 
      return typeof l.id === 'string' && l.id.startsWith(`${moduleNumber}-`);
    })
    .sort((a: Lesson, b: Lesson) => a.id.localeCompare(b.id));

  if (moduleLessons.length === 0) {
    return NextResponse.json({ error: 'Module non trouvé ou vide' }, { status: 404 });
  }

  // Calculer la durée totale du module
  const totalDuration: number = moduleLessons.reduce(
    (total: number, lesson: Lesson) => total + (lesson.duration || 0), 
    0
  );

  // Créer la structure du module
  const moduleData: ModuleData = {
    id: moduleId,
    title: moduleLessons[0].title.split(':')[0].trim(), // Assumes title format "Module X: Lesson Title"
    description: moduleLessons[0].description || "Aucune description disponible.",
    level: moduleLessons[0].difficulty || "N/A",
    lessons: moduleLessons.map((lesson: Lesson): ModuleLessonInfo => {
      const lessonIdParts = lesson.id.split('-');
      // Ensure the lesson ID part is a number, provide a fallback if not.
      const lessonNumber = lessonIdParts.length > 1 ? parseInt(lessonIdParts[1], 10) : 0;
      return {
        id: isNaN(lessonNumber) ? 0 : lessonNumber, // Fallback for ID if parsing fails
        title: lesson.title,
        duration: lesson.duration,
        completed: false // Par défaut, les leçons ne sont pas complétées
      };
    }),
    duration: `${totalDuration} min`,
    totalCompletedLessons: 0 // Par défaut, aucun module n'est complété
  };

  return NextResponse.json(moduleData);
}