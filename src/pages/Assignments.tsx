import { useEffect, useState } from "react";
import { SubmissionsManagement } from "@/components/assignments/SubmissionsManagement";
import { InactiveLMSBanner } from "@/components/InactiveLMSBanner";
import { StudentAssignmentList } from "@/components/assignments/StudentAssignmentList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AssignmentsProps {
  user?: any;
}

const Assignments = ({ user }: AssignmentsProps = {}) => {
  // Basic SEO for the page
  useEffect(() => {
    document.title = "Assignments | Student Tasks";
    const desc = "View, submit, and track your assignments with sequential unlocks.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/assignments`);
  }, []);

  const [tab, setTab] = useState<'unlocked' | 'submitted'>('unlocked');

  // Keep staff/mentor view exactly as before
  if (user?.role === 'mentor' || user?.role === 'admin' || user?.role === 'superadmin') {
    return <SubmissionsManagement userRole={user.role} />;
  }

  // Student view uses the dedicated list with correct locking logic
  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <Tabs value={tab} onValueChange={(v) => setTab(v as 'unlocked' | 'submitted')}>
          <TabsList>
            <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <InactiveLMSBanner show={user?.role === 'student' && user?.lms_status === 'inactive'} />
      <section aria-label="Student assignments list">
        <StudentAssignmentList filterMode={tab} />
      </section>
    </main>
  );
};

export default Assignments;