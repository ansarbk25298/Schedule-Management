import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntryTab } from "@/components/schedule/EntryTab";
import { PendingTab } from "@/components/schedule/PendingTab";
import { FinalApprovingTab } from "@/components/schedule/FinalApprovingTab";
import { ActiveScheduleTab } from "@/components/schedule/ActiveScheduleTab";
import { LogsTab } from "@/components/schedule/LogsTab";
import { AdminPanel } from "@/components/schedule/AdminPanel";
import { useScheduleStore } from "@/lib/scheduleStore";
import { FileSpreadsheet } from "lucide-react";

const Index = () => {
  const { requests, active } = useScheduleStore();
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const finalCount = requests.filter((r) => r.status === "awaiting_final").length;
  const logsCount = requests.filter(
    (r) => r.status === "approved" || r.status === "rejected",
  ).length;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Schedule Manager</h1>
            <p className="text-xs text-muted-foreground">Excel-style route & timing workflow</p>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="entry" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 max-w-5xl">
            <TabsTrigger value="entry">1. Entry</TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              2. Pending
              {pendingCount > 0 && (
                <span className="rounded-full bg-status-pending text-status-pending-foreground text-xs px-2 py-0.5 font-semibold">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="final" className="gap-2">
              3. Final Approving
              {finalCount > 0 && (
                <span className="rounded-full bg-status-pending text-status-pending-foreground text-xs px-2 py-0.5 font-semibold">
                  {finalCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              4. Active Schedule
              <span className="rounded-full bg-status-active text-status-active-foreground text-xs px-2 py-0.5 font-semibold">
                {active.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              5. Logs
              {logsCount > 0 && (
                <span className="rounded-full bg-muted text-foreground text-xs px-2 py-0.5 font-semibold">
                  {logsCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="admin">6. Admin Panel</TabsTrigger>
          </TabsList>

          <TabsContent value="entry">
            <EntryTab />
          </TabsContent>
          <TabsContent value="pending">
            <PendingTab />
          </TabsContent>
          <TabsContent value="final">
            <FinalApprovingTab />
          </TabsContent>
          <TabsContent value="active">
            <ActiveScheduleTab />
          </TabsContent>
          <TabsContent value="logs">
            <LogsTab />
          </TabsContent>
          <TabsContent value="admin">
            <AdminPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
