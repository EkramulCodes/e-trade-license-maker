import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows,
  className = ''
}) => {
  const baseClasses = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all";
  
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 2}
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
};
