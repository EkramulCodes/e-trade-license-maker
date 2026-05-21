import React from 'react';
import { 
  ImageIcon, 
  User, 
  Building2, 
  MapPin, 
  CreditCard, 
  Calendar,
  Edit3,
  Eye
} from 'lucide-react';
import { TradeLicenseData } from '../types';
import { cn } from '../utils/cn';
import { HistoryControls } from './HistoryControls';
import { EditorSection } from './EditorSection';
import { FormField } from './FormField';
import { MediaUpload } from './MediaUpload';

interface EditorProps {
  data: any;
  activeTab: 'edit' | 'preview';
  setActiveTab: (tab: 'edit' | 'preview') => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFeeChange: (name: string, value: string) => void;
  handleImageUpload: (type: 'photo' | 'logo' | 'qr', e: React.ChangeEvent<HTMLInputElement>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  activeMode: 'trade' | 'land';
  setActiveMode: (mode: 'trade' | 'land') => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  qrInputRef: React.RefObject<HTMLInputElement>;
}


export const Editor: React.FC<EditorProps> = ({
  data,
  activeTab,
  setActiveTab,
  handleInputChange,
  handleFeeChange,
  handleImageUpload,
  undo,
  redo,
  canUndo,
  canRedo,
  activeMode,
  setActiveMode,
  fileInputRef,
  logoInputRef,
  qrInputRef
}) => {
  const title = activeMode === 'trade' ? 'License Editor' : 'Mutation Land Editor';

  return (
    <div className={cn(
      "w-full lg:w-[450px] bg-white border-r border-slate-200 overflow-y-auto h-screen p-6 no-print transition-all duration-300",
      activeTab === 'preview' && "lg:w-0 lg:p-0 lg:opacity-0 pointer-events-none"
    )}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-600" />
            {title}
          </h1>

          <HistoryControls 
            undo={undo} 
            redo={redo} 
            canUndo={canUndo} 
            canRedo={canRedo} 
          />
        </div>
        <button 
          onClick={() => setActiveTab('preview')}
          className="lg:hidden p-2 bg-slate-100 rounded-lg"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {activeMode === 'land' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Mutation Land Mode Active</h3>
          <p className="text-sm text-blue-600">Configure land mutation fields below. Preview will show land document template.</p>
        </div>
      )}


      <div className="space-y-8">
        {/* Image Uploads */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Media Assets
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <MediaUpload label="Photo" url={data.photoUrl} onUpload={(e) => handleImageUpload('photo', e)} inputRef={fileInputRef} type="photo" />
            <MediaUpload label="Logo" url={data.logoUrl} onUpload={(e) => handleImageUpload('logo', e)} inputRef={logoInputRef} type="logo" />
            <MediaUpload label="QR Code" url={data.qrUrl} onUpload={(e) => handleImageUpload('qr', e)} inputRef={qrInputRef} type="qr" />
          </div>
        </section>

        {/* Basic Info */}
        <EditorSection title="Business Information" icon={<Building2 className="w-4 h-4" />}>
          <FormField label="Business Name (Bengali)" name="businessName" value={data.businessName} onChange={handleInputChange} />
          <FormField label="License Number" name="licenseNo" value={data.licenseNo} onChange={handleInputChange} />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Issue Date" name="issueDate" value={data.issueDate} onChange={handleInputChange} />
            <FormField label="Issue Time" name="issueTime" value={data.issueTime} onChange={handleInputChange} />
          </div>
          <FormField label="Business Nature" name="businessNature" value={data.businessNature} onChange={handleInputChange} />
          <FormField label="Business Type" name="businessType" value={data.businessType} onChange={handleInputChange} />
          <FormField label="Business Address" name="businessAddress" value={data.businessAddress} onChange={handleInputChange} type="textarea" />
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Zone" name="zoneMarket" value={data.zoneMarket} onChange={handleInputChange} />
            <FormField label="Ward" name="wardMarket" value={data.wardMarket} onChange={handleInputChange} />
            <FormField label="Area" name="area" value={data.area} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Fiscal Year" name="fiscalYear" value={data.fiscalYear} onChange={handleInputChange} />
            <FormField label="Start Date" name="businessStartDate" value={data.businessStartDate} onChange={handleInputChange} />
          </div>
        </EditorSection>

        {/* Owner Info */}
        <EditorSection title="Owner Details" icon={<User className="w-4 h-4" />}>
          <FormField label="Owner Name" name="ownerName" value={data.ownerName} onChange={handleInputChange} />
          <FormField label="Father/Husband Name" name="fatherHusbandName" value={data.fatherHusbandName} onChange={handleInputChange} />
          <FormField label="Mother Name" name="motherName" value={data.motherName} onChange={handleInputChange} />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="NID/Passport" name="nidPassport" value={data.nidPassport} onChange={handleInputChange} />
            <FormField label="BIN No" name="binNo" value={data.binNo} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Phone" name="phone" value={data.phone} onChange={handleInputChange} />
            <FormField label="Email" name="email" value={data.email} onChange={handleInputChange} />
          </div>
        </EditorSection>

        {/* Current Address */}
        <EditorSection title="Current Address" icon={<MapPin className="w-4 h-4" />}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Holding No" name="currentAddress.holdingNo" value={data.currentAddress.holdingNo} onChange={handleInputChange} />
            <FormField label="Road No" name="currentAddress.roadNo" value={data.currentAddress.roadNo} onChange={handleInputChange} />
            <FormField label="Village/Area" name="currentAddress.village" value={data.currentAddress.village} onChange={handleInputChange} />
            <FormField label="Post Code" name="currentAddress.postCode" value={data.currentAddress.postCode} onChange={handleInputChange} />
            <FormField label="Thana" name="currentAddress.thana" value={data.currentAddress.thana} onChange={handleInputChange} />
            <FormField label="District" name="currentAddress.district" value={data.currentAddress.district} onChange={handleInputChange} />
            <FormField label="Division" name="currentAddress.division" value={data.currentAddress.division} onChange={handleInputChange} className="col-span-2" />
          </div>
        </EditorSection>

        {/* Permanent Address */}
        <EditorSection title="Permanent Address" icon={<MapPin className="w-4 h-4" />}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Holding No" name="permanentAddress.holdingNo" value={data.permanentAddress.holdingNo} onChange={handleInputChange} />
            <FormField label="Road No" name="permanentAddress.roadNo" value={data.permanentAddress.roadNo} onChange={handleInputChange} />
            <FormField label="Village/Area" name="permanentAddress.village" value={data.permanentAddress.village} onChange={handleInputChange} />
            <FormField label="Post Code" name="permanentAddress.postCode" value={data.permanentAddress.postCode} onChange={handleInputChange} />
            <FormField label="Thana" name="permanentAddress.thana" value={data.permanentAddress.thana} onChange={handleInputChange} />
            <FormField label="District" name="permanentAddress.district" value={data.permanentAddress.district} onChange={handleInputChange} />
            <FormField label="Division" name="permanentAddress.division" value={data.permanentAddress.division} onChange={handleInputChange} className="col-span-2" />
          </div>
        </EditorSection>

        {/* Fees */}
        <EditorSection title="Fee Structure" icon={<CreditCard className="w-4 h-4" />}>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(data.fees) as Array<keyof TradeLicenseData['fees']>).map((key) => (
              <FormField 
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                name={`fees.${key}`}
                type="number"
                value={data.fees[key]}
                onChange={(e) => handleFeeChange(key, e.target.value)}
              />
            ))}
          </div>
        </EditorSection>

        {/* Validity */}
        <EditorSection title="Validity" icon={<Calendar className="w-4 h-4" />}>
          <FormField label="Valid Until" name="validUntil" value={data.validUntil} onChange={handleInputChange} />
        </EditorSection>
      </div>
    </div>
  );
};
