import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { X, Calendar, CheckCircle2, Shield, MapPin, Phone, User, Clock, Scissors } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const {
    language,
    isConsultationOpen,
    closeConsultation,
    t,
    showToast
  } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Al Malqa');
  const [serviceType, setServiceType] = useState('full-villa');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitted(true);
    showToast(
      language === 'ar'
        ? 'تم حجز موعد الاستشارة بنجاح! سيتصل بك المهندس المختص لتأكيد الموعد.'
        : 'Consultation booked successfully! Our drapery engineer will call to confirm.',
      'success'
    );
  };

  const handleClose = () => {
    setIsSubmitted(false);
    closeConsultation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E2DED4] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 end-4 z-20 w-8 h-8 rounded-full bg-[#FAFAF8] text-[#344054] hover:bg-[#E5E1D8] flex items-center justify-center transition-colors"
          aria-label={t('closeModal')}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-[#0A2A5E] text-white">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C8102E] font-bold uppercase tracking-wider mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>{t('customEyebrow')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury">
            {t('bookConsultation')}
          </h3>
          <p className="text-xs text-[#B8B2A8] mt-1.5 leading-relaxed">
            {language === 'ar'
              ? 'خدمة القياس المنزلي المجاني بالرياض مع إحضار حقائب عينات الأقمشة والكتالوجات'
              : 'Complimentary in-home measurement visit across Riyadh with fabric specimen books'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#4BB543]/10 text-[#4BB543] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#101828] font-serif-luxury">
                {language === 'ar' ? 'تم استلام طلب الاستشارة بنجاح' : 'Consultation Confirmed!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#475467] max-w-sm mx-auto leading-relaxed">
                {language === 'ar'
                  ? `شكراً لك يا ${fullName}. سيتواصل معك مستشار الديكور خلال ساعتين لتأكيد موعد زيارة منزلك في حي ${district}.`
                  : `Thank you, ${fullName}. Our drapery consultant will call within 2 hours to confirm the visit to ${district}.`}
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-[#0A2A5E] text-white px-8 py-3 rounded-full text-xs font-bold"
              >
                {t('closeModal')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#0F2444] mb-1">
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: محمد السبيعي' : 'e.g., Faisal Alqahtani'}
                    className="w-full bg-[#FAFAF8] text-sm rounded-xl py-2.5 ps-10 pe-4 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E]"
                  />
                  <User className="w-4 h-4 text-[#667085] absolute start-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#0F2444] mb-1">
                  {language === 'ar' ? 'رقم الجوال (السعودية)' : 'Mobile Phone (KSA)'} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-[#FAFAF8] text-sm rounded-xl py-2.5 ps-10 pe-4 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E]"
                  />
                  <Phone className="w-4 h-4 text-[#667085] absolute start-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* District & Service in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-[#0F2444] mb-1">
                    {language === 'ar' ? 'الحي في الرياض' : 'Riyadh District'}
                  </label>
                  <div className="relative">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-[#FAFAF8] text-xs rounded-xl py-2.5 ps-9 pe-3 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E] appearance-none"
                    >
                      <option value="Al Malqa">{language === 'ar' ? 'حي الملقا' : 'Al Malqa'}</option>
                      <option value="Hittin">{language === 'ar' ? 'حي حطين' : 'Hittin'}</option>
                      <option value="Al Nakheel">{language === 'ar' ? 'حي النخيل' : 'Al Nakheel'}</option>
                      <option value="Al Yasmin">{language === 'ar' ? 'حي الياسمين' : 'Al Yasmin'}</option>
                      <option value="Al Rabie">{language === 'ar' ? 'حي الربيع' : 'Al Rabie'}</option>
                      <option value="Al Olaya">{language === 'ar' ? 'حي العليا' : 'Al Olaya'}</option>
                      <option value="Other">{language === 'ar' ? 'حي آخر بالرياض' : 'Other Riyadh District'}</option>
                    </select>
                    <MapPin className="w-4 h-4 text-[#667085] absolute start-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Service Requirement */}
                <div>
                  <label className="block text-xs font-bold text-[#0F2444] mb-1">
                    {language === 'ar' ? 'نوع المشروع' : 'Project Type'}
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#FAFAF8] text-xs rounded-xl py-2.5 px-3 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E]"
                  >
                    <option value="full-home">{language === 'ar' ? 'منزل كامل — كنب وستائر' : 'Full Home — Sofas & Curtains'}</option>
                    <option value="majlis">{language === 'ar' ? 'مجلس وصالة ضيوف' : 'Majlis & Living Room'}</option>
                    <option value="sofas">{language === 'ar' ? 'كنب وكراسي' : 'Sofas & Armchairs'}</option>
                    <option value="curtains">{language === 'ar' ? 'ستائر فقط' : 'Curtains Only'}</option>
                    <option value="bespoke">{language === 'ar' ? 'قطعة مخصصة بالمقاس' : 'Bespoke Custom Piece'}</option>
                    <option value="commercial">{language === 'ar' ? 'مشروع تجاري' : 'Commercial Project'}</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-bold text-[#0F2444] mb-1">
                  {language === 'ar' ? 'التاريخ المفضل للزيارة' : 'Preferred Visit Date'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#FAFAF8] text-xs rounded-xl py-2.5 ps-10 pe-4 border border-[#CFC8BA] focus:outline-hidden focus:border-[#C8102E]"
                  />
                  <Calendar className="w-4 h-4 text-[#667085] absolute start-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#C8102E] hover:bg-[#E3C98F] text-[#0A2A5E] py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تأكيد طلب الزيارة المجانية' : 'Confirm Free Measurement Visit'}</span>
                </button>
              </div>

              <div className="text-[11px] text-[#667085] text-center pt-1">
                {language === 'ar'
                  ? 'لا يترتب على الزيارة أي رسوم أو التزام بالشراء.'
                  : 'Zero commitment and 100% free measurement service.'}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
