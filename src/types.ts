export interface TradeLicenseData {
  licenseNo: string;
  issueDate: string;
  issueTime: string;
  businessName: string;
  ownerName: string;
  fatherHusbandName: string;
  motherName: string;
  businessType: string;
  businessNature: string;
  businessAddress: string;
  zoneMarket: string;
  wardMarket: string;
  area: string;
  nidPassport: string;
  binNo: string;
  phone: string;
  email: string;
  fiscalYear: string;
  businessStartDate: string;
  currentAddress: {
    holdingNo: string;
    roadNo: string;
    village: string;
    postCode: string;
    thana: string;
    district: string;
    division: string;
  };
  permanentAddress: {
    holdingNo: string;
    roadNo: string;
    village: string;
    postCode: string;
    thana: string;
    district: string;
    division: string;
  };
  fees: {
    licenseFee: number;
    signboardTax: number;
    surcharge: number;
    vat: number;
    tax: number;
    formFee: number;
    arrears: number;
    correctionFee: number;
  };
  validUntil: string;
  photoUrl: string;
  logoUrl: string;
  qrUrl: string;
  watermarkUrl: string;
}



export const initialData: TradeLicenseData = {
  licenseNo: "TRAD/DSCC/021182/2024",
  issueDate: "03/03/2026",
  issueTime: "14:08:54",
  businessName: "রুমান ট্রেড ইন্টারন্যাশনাল",
  ownerName: "এহসানুল হক",
  fatherHusbandName: "ওসমান গনি",
  motherName: "হাজেরা বেগম",
  businessType: "অন্যান্য - একক",
  businessNature: "আমদানিকারক, সরবরাহকারী (কেমিক্যাল ব্যতীত)",
  businessAddress: "১৬, খাজে দেওয়ান ১ম লেন চকবাজার, ঢাকা ১২১১",
  zoneMarket: "৩",
  wardMarket: "২৭",
  area: "",
  nidPassport: "৭৭৬৩৩৪৬৬৫১",
  binNo: "",
  phone: "০১৮৩৩২৯২২২২",
  email: "",
  fiscalYear: "2025-2026 [নবায়নকৃত]",
  businessStartDate: "18/11/2024",
  currentAddress: {
    holdingNo: "১১",
    roadNo: "১, সেক্টর-১১",
    village: "উত্তরা",
    postCode: "",
    thana: "",
    district: "",
    division: "ঢাকা",
  },
  permanentAddress: {
    holdingNo: "",
    roadNo: "",
    village: "",
    postCode: "",
    thana: "",
    district: "",
    division: "ঐ",
  },
  fees: {
    licenseFee: 4000,
    signboardTax: 800,
    surcharge: 0,
    vat: 720,
    tax: 3000,
    formFee: 50,
    arrears: 0,
    correctionFee: 0,
  },
  validUntil: "৩০ শে জুন, 2026",
  photoUrl: "https://picsum.photos/seed/person/200/250",
  logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Dhaka_South_City_Corporation_Logo.svg/1200px-Dhaka_South_City_Corporation_Logo.svg.png",
  qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TRAD/DSCC/021182/2024",
  watermarkUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Dhaka_South_City_Corporation_Logo.svg/1200px-Dhaka_South_City_Corporation_Logo.svg.png",
};

export interface MutationLandData {
  mutationNo: string;
  issueDate: string;
  issueTime: string;
  landOwnerName: string;
  fatherHusbandName: string;
  motherName: string;
  plotNo: string;
  mouza: string;
  dagNo: string;
  khatianNo: string;
  area: string;
  landValue: number;
  businessAddress: string; // land location
  zoneWard: string;
  nidPassport: string;
  phone: string;
  email: string;
  mutationDate: string;
  currentAddress: {
    holdingNo: string;
    roadNo: string;
    village: string;
    postCode: string;
    thana: string;
    district: string;
    division: string;
  };
  permanentAddress: {
    holdingNo: string;
    roadNo: string;
    village: string;
    postCode: string;
    thana: string;
    district: string;
    division: string;
  };
  fees: {
    mutationFee: number;
    stampDuty: number;
    registrationFee: number;
    surcharge: number;
    vat: number;
    otherFee: number;
  };
  validUntil: string;
  photoUrl: string;
  logoUrl: string;
  qrUrl: string;
  watermarkUrl: string;
}

export const initialLandData: MutationLandData = {
  mutationNo: "MUT/DSCC/001/2024",
  issueDate: "01/01/2025",
  issueTime: "10:00:00",
  landOwnerName: "জামাল আহমেদ",
  fatherHusbandName: "আব্দুল করিম",
  motherName: "ফাতেমা বেগম",
  plotNo: "১২৩৪",
  mouza: "চকবাজার",
  dagNo: "৫৬৭",
  khatianNo: "৮৯০",
  area: "০.০৫ একর",
  landValue: 500000,
  businessAddress: "১৬, খাজে দেওয়ান ১ম লেন",
  zoneWard: "জোন ৩, ওয়ার্ড ২৭",
  nidPassport: "১২৩৪৫৬৭৮৯০১২",
  phone: "০১৭১২৩৪৫৬৭৮",
  email: "",
  mutationDate: "15/12/2024",
  currentAddress: {
    holdingNo: "১১",
    roadNo: "১",
    village: "চকবাজার",
    postCode: "১২১১",
    thana: "হাজারিবাগ",
    district: "ঢাকা",
    division: "ঢাকা",
  },
  permanentAddress: {
    holdingNo: "",
    roadNo: "",
    village: "",
    postCode: "",
    thana: "",
    district: "",
    division: "",
  },
  fees: {
    mutationFee: 5000,
    stampDuty: 25000,
    registrationFee: 1000,
    surcharge: 0,
    vat: 0,
    otherFee: 500,
  },
  validUntil: "৩১/১২/২০২৫",
  photoUrl: "https://picsum.photos/seed/landowner/200/250",
  logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Dhaka_South_City_Corporation_Logo.svg/1200px-Dhaka_South_City_Corporation_Logo.svg.png",
  qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MUT/DSCC/001/2024",
  watermarkUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Dhaka_South_City_Corporation_Logo.svg/1200px-Dhaka_South_City_Corporation_Logo.svg.png",
};

export type DocumentData = TradeLicenseData | MutationLandData;


