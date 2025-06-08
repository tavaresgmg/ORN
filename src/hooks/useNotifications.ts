import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'promo';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    route: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '🎉 Bem-vinda ao ORN!',
    message: 'Descubra roupas perfeitas para você com nossa IA',
    type: 'success',
    timestamp: new Date(),
    read: false,
    action: {
      label: 'Começar',
      route: '/home'
    }
  },
  {
    id: '2',
    title: '💝 Nova coleção para você',
    message: 'Peças selecionadas especialmente para seu estilo',
    type: 'info',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    action: {
      label: 'Ver agora',
      route: '/home'
    }
  },
  {
    id: '3',
    title: '🏷️ Promoção exclusiva!',
    message: '30% OFF em peças da sua paleta de cores',
    type: 'promo',
    timestamp: new Date(Date.now() - 7200000),
    read: true,
    action: {
      label: 'Aproveitar',
      route: '/search'
    }
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      return permission;
    }
    return Notification.permission;
  }, []);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/logo.png',
        badge: '/logo.png',
        ...options
      });
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show push notification if permitted
    if (permission === 'granted') {
      showNotification(notification.title, {
        body: notification.message,
        tag: newNotification.id
      });
    }
  }, [permission, showNotification]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    permission,
    unreadCount,
    requestPermission,
    showNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification
  };
};