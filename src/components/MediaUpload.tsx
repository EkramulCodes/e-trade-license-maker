import React from 'react';
import { Upload, QrCode } from 'lucide-react';

interface MediaUploadProps {
  label: string;
  url: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  type: 'photo' | 'logo' | 'qr';
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ label, url, onUpload, inputRef, type }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <div 
        onClick={() => inputRef.current?.click()}
        className={`aspect-${type === 'photo' ? '[3/4]' : 'square'} bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors overflow-hidden p-${type === 'photo' ? '0' : '2'}`}
      >
        {url ? (
          <img src={url} className={`w-full h-full ${type === 'photo' ? 'object-cover' : 'object-contain'}`} alt={label} />
        ) : (
          type === 'qr' ? <QrCode className="w-6 h-6 text-slate-400" /> : <Upload className="w-6 h-6 text-slate-400" />
        )}
      </div>
      <input type="file" ref={inputRef} hidden onChange={onUpload} accept="image/*" />
    </div>
  );
};
