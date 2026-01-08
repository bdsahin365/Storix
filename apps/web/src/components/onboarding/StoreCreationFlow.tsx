'use client';

import { useState } from 'react';
import Step1Welcome from './Step1Welcome';
import Step2BasicInfo from './Step2BasicInfo';
import Step3StoreType from './Step3StoreType';
import Step4Review from './Step4Review';
import Step5Success from './Step5Success';

export type StoreFormData = {
    name: string;
    owner_name: string;
    phone: string;
    address: string;
    store_type: string;
};

export default function StoreCreationFlow({ userPhone, userName }: { userPhone: string; userName?: string }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<StoreFormData>({
        name: '',
        owner_name: userName || '',
        phone: userPhone,
        address: '',
        store_type: '',
    });

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const goToStep = (step: number) => setCurrentStep(step);

    const updateFormData = (data: Partial<StoreFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {currentStep === 1 && <Step1Welcome onNext={nextStep} />}
            {currentStep === 2 && (
                <Step2BasicInfo
                    formData={formData}
                    onUpdate={updateFormData}
                    onNext={nextStep}
                />
            )}
            {currentStep === 3 && (
                <Step3StoreType
                    selectedType={formData.store_type}
                    onSelect={(type) => updateFormData({ store_type: type })}
                    onNext={nextStep}
                />
            )}
            {currentStep === 4 && (
                <Step4Review
                    formData={formData}
                    onEdit={() => goToStep(2)}
                    onSuccess={() => setCurrentStep(5)}
                />
            )}
            {currentStep === 5 && <Step5Success shopName={formData.name} />}
        </div>
    );
}
