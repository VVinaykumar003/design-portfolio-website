
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  console.log("AdminLayout rendered");
  return (
    <div className="admin-layout">
      <main>
        {/* <Sidebar/> */}
        {children}
      </main>
    </div>
  );
}