import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, Upload, Ruler, Calendar, Target, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { mockBodyTypes, mockColorPalettes } from '../mock/data';
import type { UserProfile } from '../types';

const steps = [
  { id: 'profile', title: 'Perfil básico', icon: Ruler },
  { id: 'photos', title: 'Análise visual', icon: Camera },
  { id: 'goals', title: 'Seus objetivos', icon: Target },
  { id: 'results', title: 'Resultados', icon: Check }
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProfile, completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    height: '',
    age: '',
    bust: '',
    waist: '',
    hip: '',
    bodyPhoto: null as File | null,
    facePhoto: null as File | null,
    goals: [] as string[]
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (type: 'body' | 'face', file: File) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Photo`]: file
    }));
  };

  const analyzeProfile = async () => {
    setLoading(true);
    // Simular análise de IA
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Gerar perfil mockado baseado nos inputs
    const profile: UserProfile = {
      height: Number(formData.height) || 165,
      age: Number(formData.age) || 32,
      measurements: {
        bust: Number(formData.bust) || 90,
        waist: Number(formData.waist) || 72,
        hip: Number(formData.hip) || 98
      },
      bodyType: mockBodyTypes.curvy,
      colorPalette: mockColorPalettes.warm,
      photoAnalysis: {
        bodyPhoto: formData.bodyPhoto ? URL.createObjectURL(formData.bodyPhoto) : undefined,
        facePhoto: formData.facePhoto ? URL.createObjectURL(formData.facePhoto) : undefined,
        analyzedAt: new Date()
      }
    };

    setUserProfile(profile);
    setLoading(false);
    handleNext();
  };

  const finishOnboarding = () => {
    completeOnboarding();
    navigate('/home');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Vamos criar seu perfil</h2>
              <p className="text-neutral-600">Informações básicas para personalizar suas recomendações</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Ruler className="inline w-4 h-4 mr-1" />
                  Altura (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="input"
                  placeholder="Ex: 165"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Idade
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="input"
                  placeholder="Ex: 32"
                />
              </div>
            </div>

            <div className="bg-neutral-100 rounded-xl p-4">
              <p className="text-sm font-medium text-neutral-700 mb-3">📐 Medidas opcionais (mais precisão)</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-neutral-600">Busto</label>
                  <input
                    type="number"
                    value={formData.bust}
                    onChange={(e) => setFormData(prev => ({ ...prev, bust: e.target.value }))}
                    className="input text-sm"
                    placeholder="cm"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600">Cintura</label>
                  <input
                    type="number"
                    value={formData.waist}
                    onChange={(e) => setFormData(prev => ({ ...prev, waist: e.target.value }))}
                    className="input text-sm"
                    placeholder="cm"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-600">Quadril</label>
                  <input
                    type="number"
                    value={formData.hip}
                    onChange={(e) => setFormData(prev => ({ ...prev, hip: e.target.value }))}
                    className="input text-sm"
                    placeholder="cm"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-neutral-500">
              🔒 Seus dados são privados e nunca serão compartilhados
            </p>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="photos"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Análise visual com IA</h2>
              <p className="text-neutral-600">Vamos analisar seu tipo de corpo e cores ideais</p>
            </div>

            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-neutral-900">📷 Foto corpo inteiro</p>
                    <p className="text-sm text-neutral-600">De frente, roupas ajustadas</p>
                  </div>
                  {formData.bodyPhoto && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex gap-3">
                  <label className="btn-secondary flex-1 cursor-pointer">
                    <Camera className="w-5 h-5 mr-2" />
                    Tirar foto
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handlePhotoUpload('body', e.target.files[0])}
                    />
                  </label>
                  <label className="btn-secondary flex-1 cursor-pointer">
                    <Upload className="w-5 h-5 mr-2" />
                    Galeria
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handlePhotoUpload('body', e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-neutral-900">🎨 Foto rosto e pescoço</p>
                    <p className="text-sm text-neutral-600">Para análise de cores</p>
                  </div>
                  {formData.facePhoto && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex gap-3">
                  <label className="btn-secondary flex-1 cursor-pointer">
                    <Camera className="w-5 h-5 mr-2" />
                    Tirar foto
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handlePhotoUpload('face', e.target.files[0])}
                    />
                  </label>
                  <label className="btn-secondary flex-1 cursor-pointer">
                    <Upload className="w-5 h-5 mr-2" />
                    Galeria
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handlePhotoUpload('face', e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-4">
              <p className="text-sm text-primary font-medium">💡 Dica: Use boa iluminação natural</p>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Qual seu principal objetivo?</h2>
              <p className="text-neutral-600">Isso nos ajuda a personalizar sua experiência</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'find-flattering', label: 'Encontrar roupas que me valorizem', emoji: '✨' },
                { id: 'understand-style', label: 'Entender o que combina comigo', emoji: '🎯' },
                { id: 'stop-mistakes', label: 'Parar de comprar peças erradas', emoji: '🛍️' },
                { id: 'discover-style', label: 'Descobrir meu estilo pessoal', emoji: '💎' }
              ].map(goal => (
                <button
                  key={goal.id}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      goals: prev.goals.includes(goal.id)
                        ? prev.goals.filter(g => g !== goal.id)
                        : [...prev.goals, goal.id]
                    }));
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                    formData.goals.includes(goal.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-2xl">{goal.emoji}</span>
                  <span className={`font-medium ${
                    formData.goals.includes(goal.id) ? 'text-primary' : 'text-neutral-700'
                  }`}>
                    {goal.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={analyzeProfile}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                  Analisando com IA...
                </span>
              ) : (
                'Analisar agora'
              )}
            </button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Análise concluída!</h2>
              <p className="text-neutral-600">Seu perfil ORN está pronto</p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">📊 Análise do seu corpo</h3>
                <p className="text-sm text-neutral-600 mb-1">• Silhueta: <span className="font-medium text-primary">Curvilínea</span></p>
                <p className="text-sm text-neutral-600 mb-1">• Pontos fortes: <span className="font-medium">Cintura definida</span></p>
                <p className="text-sm text-neutral-600">• Recomendação: <span className="font-medium">Roupas que marquem a cintura</span></p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">🎨 Suas cores ideais</h3>
                <p className="text-sm text-neutral-600 mb-3">• Tom de pele: <span className="font-medium text-primary">Quente</span></p>
                <div className="flex gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500" title="Terracota" />
                  <div className="w-8 h-8 rounded-full bg-yellow-500" title="Dourado" />
                  <div className="w-8 h-8 rounded-full bg-red-400" title="Coral" />
                  <div className="w-8 h-8 rounded-full bg-green-700" title="Verde Oliva" />
                </div>
                <p className="text-xs text-neutral-500">Cores que mais favorecem você</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-primary/10 rounded-xl p-4 text-center"
              >
                <p className="text-primary font-medium">
                  ✨ 3 recomendações personalizadas te esperam!
                </p>
              </motion.div>
            </div>

            <button
              onClick={finishOnboarding}
              className="btn-primary w-full"
            >
              Ver minhas recomendações
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className={`p-2 ${currentStep === 0 ? 'invisible' : ''}`}
          >
            <ArrowLeft className="w-6 h-6 text-neutral-700" />
          </button>

          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-2 w-16 rounded-full transition-all ${
                  index <= currentStep ? 'bg-primary' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>

          <div className="w-10" />
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {currentStep < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 left-6 right-6"
          >
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && (!formData.height || !formData.age)) ||
                (currentStep === 1 && (!formData.bodyPhoto || !formData.facePhoto))
              }
              className="btn-primary w-full"
            >
              Próximo
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;