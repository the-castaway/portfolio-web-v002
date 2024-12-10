import React from "react";

// app/some-folder/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
    // Convert children into an array
    const childrenArray = React.Children.toArray(children);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '10px', background: '#f8f9fa' }}>
                {childrenArray[0] || "Default Column 1"}
            </div>
            <div style={{ flex: 1, padding: '10px', background: '#e9ecef' }}>
                {childrenArray[1] || "Default Column 2"}
            </div>
            <div style={{ flex: 1, padding: '10px', background: '#dee2e6' }}>
                {childrenArray[2] || "Default Column 3"}
            </div>
        </div>
    );
}