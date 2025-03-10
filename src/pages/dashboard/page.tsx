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
            <Suspense fallback={<div>Loading...</div>}>
                {/* Replace with your Workflows component when available */}
                <div>Workflows content will go here</div>
            </Suspense>
        </div>
    </div>
  );
}

export default page
