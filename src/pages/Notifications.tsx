import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, Check, Trash2, Tag, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    permission, 
    requestPermission, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'promo':
        return <Tag className="w-5 h-5 text-primary" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-neutral-500" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Agora mesmo';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} h atrás`;
    return `${Math.floor(seconds / 86400)} dias atrás`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6 text-neutral-700" />
            </button>
            <h1 className="text-lg font-semibold text-neutral-900">Notificações</h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary font-medium"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        {/* Permission Banner */}
        {permission === 'default' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-neutral-900">
                  Ative as notificações
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  Receba alertas sobre promoções e novidades do seu estilo
                </p>
                <button
                  onClick={requestPermission}
                  className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
                >
                  Ativar notificações
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Notifications List */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellOff className="w-10 h-10 text-neutral-400" />
            </div>
            <p className="text-neutral-600 font-medium">
              Nenhuma notificação
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Você será notificada sobre novidades e promoções
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl p-4 ${
                  !notification.read ? 'border-2 border-primary/20' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium text-neutral-900 ${
                      !notification.read ? 'font-semibold' : ''
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-neutral-500">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                      <div className="flex gap-2">
                        {notification.action && (
                          <button
                            onClick={() => {
                              markAsRead(notification.id);
                              navigate(notification.action!.route);
                            }}
                            className="text-xs text-primary font-medium"
                          >
                            {notification.action.label}
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;