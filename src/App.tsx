import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { generatePDF } from './utils/pdfGenerator';
import { TradeLicenseData, initialData, MutationLandData, initialLandData, DocumentData } from './types';

import { Editor } from './components/Editor';
import { Toolbar } from './components/Toolbar';
import { Preview } from './components/Preview';

export default function App() {
  const [activeMode, setActiveMode] = useState<'trade' | 'land'>('trade');
  const [data, setData] = useState<TradeLicenseData>(initialData);
  const [landData, setLandData] = useState<MutationLandData>(initialLandData);
  const [history, setHistory] = useState<TradeLicenseData[]>([initialData]);
  const [landHistory, setLandHistory] = useState<MutationLandData[]>([initialLandData]);

  const [pointer, setPointer] = useState(0);
  const [landPointer, setLandPointer] = useState(0);
  const isUndoRedoAction = useRef(false);
  const isLandUndoRedoAction = useRef(false);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifyId = params.get('verify');
    if (verifyId) {
      setIsVerifying(true);
      setActiveTab('preview');
      fetch(`/api/licenses/${encodeURIComponent(verifyId)}`)
        .then(res => res.json())
        .then(licenseData => {
          if (!licenseData.error) {
            setData(licenseData);
          }
        })
        .catch(err => console.error("Verification error:", err))
        .finally(() => setIsVerifying(false));
    }
  }, []);

  const saveDocument = async (docData: DocumentData, type: 'trade' | 'land') => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const id = (docData as any).licenseNo ? (docData as TradeLicenseData).licenseNo.replace(/\//g, '_') : (docData as MutationLandData).mutationNo.replace(/\//g, '_');
      await fetch('/api/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, data: docData, type })
      });
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };


  const saveLicense = () => saveDocument(data, 'trade');
  const saveLand = () => saveDocument(landData, 'land');


  // History management for trade license
  useEffect(() => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const lastState = history[pointer];
      if (JSON.stringify(data) !== JSON.stringify(lastState)) {
        const newHistory = history.slice(0, pointer + 1);
        newHistory.push(data);
        if (newHistory.length > 50) {
          newHistory.shift();
          setPointer(newHistory.length - 1);
        } else {
          setPointer(newHistory.length - 1);
        }
        setHistory(newHistory);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data, history, pointer]);

  // History management for land mutation
  useEffect(() => {
    if (isLandUndoRedoAction.current) {
      isLandUndoRedoAction.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const lastState = landHistory[landPointer];
      if (JSON.stringify(landData) !== JSON.stringify(lastState)) {
        const newHistory = landHistory.slice(0, landPointer + 1);
        newHistory.push(landData);
        if (newHistory.length > 50) {
          newHistory.shift();
          setLandPointer(newHistory.length - 1);
        } else {
          setLandPointer(newHistory.length - 1);
        }
        setLandHistory(newHistory);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [landData, landHistory, landPointer]);


  const undo = () => {
    if (activeMode === 'trade') {
      if (pointer > 0) {
        isUndoRedoAction.current = true;
        const newPointer = pointer - 1;
        setPointer(newPointer);
        setData(history[newPointer]);
      }
    } else {
      if (landPointer > 0) {
        isLandUndoRedoAction.current = true;
        const newPointer = landPointer - 1;
        setLandPointer(newPointer);
        setLandData(landHistory[newPointer]);
      }
    }
  };

  const redo = () => {
    if (activeMode === 'trade') {
      if (pointer < history.length - 1) {
        isUndoRedoAction.current = true;
        const newPointer = pointer + 1;
        setPointer(newPointer);
        setData(history[newPointer]);
      }
    } else {
      if (landPointer < landHistory.length - 1) {
        isLandUndoRedoAction.current = true;
        const newPointer = landPointer + 1;
        setLandPointer(newPointer);
        setLandData(landHistory[newPointer]);
      }
    }
  };

  const canUndo = activeMode === 'trade' ? pointer > 0 : landPointer > 0;
  const canRedo = activeMode === 'trade' ? pointer < history.length - 1 : landPointer < landHistory.length - 1;


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pointer, history, landPointer, landHistory]);


  // Auto-save when data changes and we're in preview mode
  useEffect(() => {
    if (activeTab === 'preview') {
      const timer = setTimeout(() => {
        if (activeMode === 'trade') {
          saveLicense();
        } else {
          saveLand();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, landData, activeTab, activeMode]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (activeMode === 'trade') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof TradeLicenseData] as any),
            [child]: value
          }
        }));
      } else {
        setData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setLandData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof MutationLandData] as any),
            [child]: value
          }
        }));
      } else {
        setLandData(prev => ({ ...prev, [name]: value }));
      }
    }
  };


  const handleFeeChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (activeMode === 'trade') {
      setData(prev => ({
        ...prev,
        fees: {
          ...prev.fees,
          [name as keyof TradeLicenseData['fees']]: numValue
        }
      }));
    } else {
      setLandData(prev => ({
        ...prev,
        fees: {
          ...prev.fees,
          [name as keyof MutationLandData['fees']]: numValue
        }
      }));
    }
  };


  const handleImageUpload = (type: 'photo' | 'logo' | 'qr', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        if (activeMode === 'trade') {
          if (type === 'photo') setData(prev => ({ ...prev, photoUrl: url }));
          if (type === 'logo') setData(prev => ({ ...prev, logoUrl: url, watermarkUrl: url }));
          if (type === 'qr') setData(prev => ({ ...prev, qrUrl: url }));
        } else {
          if (type === 'photo') setLandData(prev => ({ ...prev, photoUrl: url }));
          if (type === 'logo') setLandData(prev => ({ ...prev, logoUrl: url, watermarkUrl: url }));
          if (type === 'qr') setLandData(prev => ({ ...prev, qrUrl: url }));
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handlePrint = async () => {
    if (activeMode === 'trade') {
      await saveLicense();
    } else {
      await saveLand();
    }
    setTimeout(() => {
      try {
        window.print();
      } catch (e) {
        console.error("Print error:", e);
      }
    }, 250);
  };

  const handleDownloadPDF = async () => {
    const docType = activeMode === 'trade' ? 'Trade_License' : 'Mutation_Land';
    const docNo = activeMode === 'trade' ? data.licenseNo : landData.mutationNo;
    if (activeMode === 'trade') {
      await saveLicense();
    } else {
      await saveLand();
    }
    generatePDF('license-document', `${docType}_${docNo.replace(/\//g, '_')}.pdf`);
  };


  const currentData = activeMode === 'trade' ? data : landData;
  const verificationUrl = `${window.location.origin}?verify=${encodeURIComponent((currentData as any).licenseNo || (currentData as any).mutationNo).replace(/\//g, '_')}`;
  const dynamicQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verificationUrl)}`;
  const displayQrUrl = currentData.qrUrl.includes('api.qrserver.com') ? dynamicQrUrl : currentData.qrUrl;


  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Verifying License</h2>
            <p className="text-slate-500">Please wait while we fetch the official license data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      <Editor 
        data={activeMode === 'trade' ? data : landData as any}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleInputChange={handleInputChange}
        handleFeeChange={handleFeeChange}
        handleImageUpload={handleImageUpload}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        fileInputRef={fileInputRef}
        logoInputRef={logoInputRef}
        qrInputRef={qrInputRef}
      />


      <div className="flex-1 overflow-y-auto h-screen p-4 lg:p-8 flex flex-col items-center">
        <Toolbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          isSaving={isSaving}
          handlePrint={handlePrint}
          handleDownloadPDF={handleDownloadPDF}
        />


        <Preview 
          data={currentData as any}
          displayQrUrl={displayQrUrl}
        />

      </div>
    </div>
  );
}
