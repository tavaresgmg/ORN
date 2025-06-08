import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-neutral-50 to-secondary/10 flex flex-col justify-between p-6 safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ORN" className="w-32 h-32 object-contain" />
        </motion.div>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-neutral-600 mt-8 mb-12 max-w-xs"
        >
          Descubra roupas que valorizam <span className="text-primary font-semibold">SEU</span> corpo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-3 gap-4 text-center mb-12">
            <div>
              <div className="text-3xl font-bold text-primary">96%</div>
              <div className="text-sm text-neutral-600">sentem insegurança</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">100%</div>
              <div className="text-sm text-neutral-600">já erraram compras</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-neutral-600">IA personal stylist</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="space-y-4"
      >
        <button
          onClick={() => navigate('/onboarding')}
          className="btn-primary w-full flex items-center justify-center gap-3"
        >
          Começar agora
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/home')}
          className="btn-secondary w-full"
        >
          Já tenho conta
        </button>

        <p className="text-xs text-center text-neutral-500 mt-4">
          Ao continuar, você concorda com nossos termos e política de privacidade
        </p>
      </motion.div>
    </div>
  );
};

export default Welcome;