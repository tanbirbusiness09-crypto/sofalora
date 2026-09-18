export interface RiyadhDistrict {
  id: string;
  name: { en: string; ar: string };
  zone: 'North' | 'East' | 'Central' | 'West' | 'South';
}

export const RIYADH_DISTRICTS: RiyadhDistrict[] = [
  { id: 'al-malqa', name: { en: 'Al-Malqa', ar: 'الملقا' }, zone: 'North' },
  { id: 'al-yasmin', name: { en: 'Al-Yasmin', ar: 'الياسمين' }, zone: 'North' },
  { id: 'hittin', name: { en: 'Hittin', ar: 'حطين' }, zone: 'North' },
  { id: 'al-nakheel', name: { en: 'Al-Nakheel', ar: 'النخيل' }, zone: 'North' },
  { id: 'al-sahafa', name: { en: 'Al-Sahafa', ar: 'الصحافة' }, zone: 'North' },
  { id: 'al-ghadeer', name: { en: 'Al-Ghadeer', ar: 'الغدير' }, zone: 'North' },
  { id: 'al-narjis', name: { en: 'Al-Narjis', ar: 'النرجس' }, zone: 'North' },
  { id: 'al-olaya', name: { en: 'Al-Olaya', ar: 'العليا' }, zone: 'Central' },
  { id: 'al-sulaimaniyah', name: { en: 'Al-Sulaimaniyah', ar: 'السليمانية' }, zone: 'Central' },
  { id: 'al-muhammadiyah', name: { en: 'Al-Muhammadiyah', ar: 'المحمدية' }, zone: 'North' },
  { id: 'al-rabwa', name: { en: 'Al-Rabwa', ar: 'الربوة' }, zone: 'East' },
  { id: 'al-hamra', name: { en: 'Al-Hamra', ar: 'الحمراء' }, zone: 'East' },
  { id: 'al-rawdah', name: { en: 'Al-Rawdah', ar: 'الروضة' }, zone: 'East' },
  { id: 'qurtubah', name: { en: 'Qurtubah', ar: 'قرطبة' }, zone: 'East' },
  { id: 'al-khuzama', name: { en: 'Al-Khuzama', ar: 'الخزامى' }, zone: 'West' },
  { id: 'al-wadi', name: { en: 'Al-Wadi', ar: 'الوادي' }, zone: 'North' },
  { id: 'al-falah', name: { en: 'Al-Falah', ar: 'الفلاح' }, zone: 'North' },
  { id: 'al-arid', name: { en: 'Al-Arid', ar: 'العارض' }, zone: 'North' },
  { id: 'diplomatic-quarter', name: { en: 'Diplomatic Quarter (DQ)', ar: 'حي السفارات' }, zone: 'West' }
];
