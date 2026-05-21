import React from 'react';

interface EditorSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const EditorSection: React.FC<EditorSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
        {icon} {title}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
};
