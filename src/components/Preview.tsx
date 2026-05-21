import React from 'react';
import { TradeLicenseData } from '../types';

interface PreviewProps {
  data: TradeLicenseData;
  displayQrUrl: string;
}

export const Preview: React.FC<PreviewProps> = ({ data, displayQrUrl }) => {
  const totalFee: number = (Object.values(data.fees) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  return (
    <div id="license-document" className="a4-page font-sans text-[11px] leading-tight relative doc-bg-white">
      {/* Watermark */}
      {data.watermarkUrl && (
        <img src={data.watermarkUrl} className="watermark" alt="Watermark" />
      )}

      {/* Header */}
      <div className="text-center space-y-0.5 mb-4 relative z-10">
        <h1 className="text-xl font-bold doc-text-brand">ঢাকা দক্ষিণ সিটি কর্পোরেশন</h1>
        <p className="text-[10px] doc-text-slate-600">www.dscc.gov.bd</p>
      </div>

      {/* Top Section: QR, Logo + Title, Photo */}
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="w-20 h-20">
          {displayQrUrl && <img src={displayQrUrl} className="w-full h-full object-contain" alt="QR" />}
        </div>
        
        <div className="flex-1 flex flex-col items-center pt-1">
          <div className="w-16 h-16 mb-2">
            {data.logoUrl && <img src={data.logoUrl} className="w-full h-full object-contain" alt="Logo" />}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-0.5">ই-ট্রেড লাইসেন্স</h2>
            <p className="font-bold text-[10px]">লাইসেন্স নং : {data.licenseNo}</p>
          </div>
        </div>

        <div className="w-24 h-32 p-0.5 doc-bg-white">
          {data.photoUrl ? (
            <img src={data.photoUrl} className="w-full h-full object-cover" alt="Photo" />
          ) : (
            <div className="w-full h-full doc-bg-slate-50 flex items-center justify-center doc-text-slate-300">Photo</div>
          )}
        </div>
      </div>

      {/* License Issue Details */}
      <div className="flex justify-start doc-border-accent pb-1 mb-2 relative z-10">
        <div className="space-y-0.5">
          <p className="font-semibold text-xs underline">লাইসেন্স ইস্যুর বিবরণ</p>
          <div className="space-y-0">
            <p><span className="inline-block w-20">ইস্যুর তারিখ</span> : {data.issueDate}</p>
            <p><span className="inline-block w-20">ইস্যুর সময়</span> : {data.issueTime}</p>
          </div>
        </div>
      </div>

      {/* Legal Text Container */}
      <div className="relative z-10 border doc-border-accent p-2 mb-2">
        <div className="text-[10px] text-[#48616c]">
          স্থানীয় সরকার (সিটি কর্পোরেশন) আইন, ২০০৯ (২০০৯ সনের ৬০ নং আইন) এর ধারা ৮৪- তে প্রদত্ত ক্ষমতাবলে সরকার প্রণীত আদর্শ কর তফসিল, ২০১৬ এর ১০ অনুচ্ছেদ অনুযায়ী ব্যবসা, বৃত্তি, পেশা বা শিল্প প্রতিষ্ঠানের উপর আরোপিত কর আদায়ের লক্ষ্যে নিম্নবর্ণিত ব্যক্তি/ প্রতিষ্ঠানের অনুকূলে অত্র ট্রেড লাইসেন্সটি ইস্যু করা হলো।
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-1 relative z-10 border doc-border-accent p-2">
        {/* Row 1 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">১। ব্যবসা প্রতিষ্ঠানের নাম</p>
          <p>: {data.businessName}</p>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">২। প্রতিষ্ঠানের মালিকের নাম</p>
          <p>: {data.ownerName}</p>
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৩। পিতা / স্বামীর নাম</p>
          <p>: {data.fatherHusbandName}</p>
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৪। মাতার নাম</p>
          <p>: {data.motherName}</p>
        </div>
        {/* Row 5 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৫। ব্যবসার প্রকৃতি</p>
          <p>: {data.businessType}</p>
        </div>
        {/* Row 6 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৬। ব্যবসার ধরণ</p>
          <p>: {data.businessNature}</p>
        </div>
        {/* Row 7 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold underline">৭। প্রতিষ্ঠানের ঠিকানা</p>
          <p>: {data.businessAddress}</p>
        </div>
        {/* Row 8 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৮। অঞ্চল / বাজার শাখা</p>
          <div className="grid grid-cols-2 gap-4">
            <p>: {data.zoneMarket}</p>
            <div className="flex gap-2">
              <p className="font-bold">ওয়ার্ড / মার্কেট:</p>
              <p>{data.wardMarket}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold pl-4">এলাকা</p>
          <p>: {data.area}</p>
        </div>

        {/* Row 9 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">৯। এনআইডি/পাসপোর্ট/জন্ম নিব: নং</p>
          <div className="grid grid-cols-2 gap-4">
            <p>: {data.nidPassport}</p>
            <div className="flex gap-2">
              <p className="font-bold">বিআইএন নং:</p>
              <p>{data.binNo}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold pl-4">ফোন</p>
          <div className="grid grid-cols-2 gap-4">
            <p>: {data.phone}</p>
            <div className="flex gap-2">
              <p className="font-bold">ই-মেইল:</p>
              <p>{data.email}</p>
            </div>
          </div>
        </div>

        {/* Row 10 */}
        <div className="grid grid-cols-[180px_1fr] gap-4 items-start">
          <p className="font-bold">১০। অর্থ বছর</p>
          <div className="grid grid-cols-2 gap-4">
            <p>: {data.fiscalYear}</p>
            <div className="flex gap-2">
              <p className="font-bold">ব্যবসা শুরুর তারিখ:</p>
              <p>{data.businessStartDate}</p>
            </div>
          </div>
        </div>

        {/* Row 11: Addresses */}
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="space-y-1">
            <p className="font-bold pb-1 underline">১১। মালিকের বর্তমান ঠিকানা</p>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <p>হোল্ডিং নং</p><p>: {data.currentAddress.holdingNo}</p>
              <p>রোড নং</p><p>: {data.currentAddress.roadNo}</p>
              <p>গ্রাম / মহল্লা</p><p>: {data.currentAddress.village}</p>
              <p>পোস্টকোড</p><p>: {data.currentAddress.postCode}</p>
              <p>থানা</p><p>: {data.currentAddress.thana}</p>
              <p>জেলা</p><p>: {data.currentAddress.district}</p>
              <p>বিভাগ</p><p>: {data.currentAddress.division}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-bold pb-1 underline">১২। মালিকের স্থায়ী ঠিকানা</p>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <p>হোল্ডিং নং</p><p>: {data.permanentAddress.holdingNo}</p>
              <p>রোড নং</p><p>: {data.permanentAddress.roadNo}</p>
              <p>গ্রাম / মহল্লা</p><p>: {data.permanentAddress.village}</p>
              <p>পোস্টকোড</p><p>: {data.permanentAddress.postCode}</p>
              <p>থানা</p><p>: {data.permanentAddress.thana}</p>
              <p>জেলা</p><p>: {data.permanentAddress.district}</p>
              <p>বিভাগ</p><p>: {data.permanentAddress.division}</p>
            </div>
          </div>
        </div>

        {/* Row 13: Fees */}
        <div className="pt-2">
          <p className="font-bold pb-1 underline">১৩। ট্রেড লাইসেন্স/নবায়ন ফি(বার্ষিক)</p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-1 pt-2">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <p>লাইসেন্স/নবায়ন ফি</p><p className="font-bold">: {data.fees.licenseFee.toFixed(2)}</p>
              <p>সারচার্জ</p><p className="font-bold">: {data.fees.surcharge.toFixed(2)}</p>
              <p>আয়কর / উৎসকর</p><p className="font-bold">: {data.fees.tax.toFixed(2)}</p>
              <p>বকেয়া ()</p><p className="font-bold">: {data.fees.arrears.toFixed(2)}</p>
              <p>সংশোধনী ফি</p><p className="font-bold">: {data.fees.correctionFee.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <p>সাইনবোর্ড কর</p><p className="font-bold">: {data.fees.signboardTax.toFixed(2)}</p>
              <p>ভ্যাট</p><p className="font-bold">: {data.fees.vat.toFixed(2)}</p>
              <p>ফর্ম ফি</p><p className="font-bold">: {data.fees.formFee.toFixed(2)}</p>
              <p className="font-bold">সর্বমোট</p><p className="font-bold">: {totalFee.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Validity Footer */}
        <div className="text-center mt-4 mb-2 relative z-10 -mx-2">
          <p className="text-base px-2">অত্র ট্রেড লাইসেন্স এর মেয়াদ {data.validUntil} পর্যন্ত</p>
          <div className="border-t doc-border-accent mt-[0.5in] w-full"></div>
        </div>

        {/* Signature Area */}
        <div className="grid grid-cols-2 gap-20 px-10 relative z-10 mt-32">
          {/* Seal Image */}
          <div className="absolute left-1/2 -top-12 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
            <img src="/seal.png" alt="Seal" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center space-y-1">
            <div>
              <p>লাইসেন্স ও বিজ্ঞাপন সুপারভাইজার</p>
            </div>
          </div>
          <div className="text-center space-y-1 relative">
            <div>
              <p>কর কর্মকর্তা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
