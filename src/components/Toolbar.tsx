import React from 'react';
import { Edit3, Eye, Loader2, CheckCircle2, Printer, Download, MapPin, Building2 } from 'lucide-react';

import { cn } from '../utils/cn';

interface ToolbarProps {
  activeTab: 'edit' | 'preview';
  setActiveTab: (tab: 'edit' | 'preview') => void;
  activeMode: 'trade' | 'land';
  setActiveMode: (mode: 'trade' | 'land') => void;
  isSaving: boolean;
  handlePrint: () => void;
  handleDownloadPDF: () => void;
}


export const Toolbar: React.FC<ToolbarProps> = ({
  activeTab,
  setActiveTab,
  activeMode,
  setActiveMode,
  isSaving,
  handlePrint,
  handleDownloadPDF
}) => {
  return (
    <div className="w-full max-w-[210mm] flex items-center justify-between mb-6 no-print">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveTab('edit')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
            activeTab === 'edit' ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"
          )}
        >
          <Edit3 className="w-4 h-4" /> Edit
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
            activeTab === 'preview' ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50"
          )}
        >
          <Eye className="w-4 h-4" /> Preview
        </button>
        <button 
          onClick={() => setActiveMode('land')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
            activeMode === 'land' ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          )}
        >
          <MapPin className="w-4 h-4" /> Mutation Land Editor
        </button>
        <button 
          onClick={() => setActiveMode('trade')}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
            activeMode === 'trade' ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          )}
        >
          <Building2 className="w-4 h-4" /> Trade License Editor
        </button>
      </div>

      <div className="flex items-center gap-2">
        {isSaving && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" />
            Saving...
          </div>
        )}
        {!isSaving && activeTab === 'preview' && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Saved
          </div>
        )}
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-white text-slate-600 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-all border border-slate-200"
        >
          <Printer className="w-4 h-4" /> Print
        </button>
        <button 
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>
    </div>
  );
};
