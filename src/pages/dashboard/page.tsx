import { User } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

function page() {
  return (
    <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Workflows</h1>
                <p className="text-muted-foreground">Manage your workflows here</p>
            </div>
        </div>
        <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
                <WorkflowsWrapper />
            </Suspense>
        </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
    return(
        <div className="space-y-2">
            {[1,2,3,4].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
    )
}

// Client component wrapper
function WorkflowsWrapper() {
    const [workflows, setWorkflows] = React.useState(null);
    
    React.useEffect(() => {
        // Fetch workflows data here
        // This is a placeholder for actual data fetching
    }, []);
    
    return (
        <div>
            {/* Display workflows data here */}
            Workflows content
        </div>
    );
}

// Keep this for server-side data fetching if needed
async function UserWorkflows() {
    return (
        <div></div>
    )
}

export default page;
