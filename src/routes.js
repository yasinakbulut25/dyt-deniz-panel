import {
  BaselineIcon,
  ChatDotsIcon,
  GemIcon,
  ImageIcon,
  NotificationIcon,
  PenSquareIcon,
  QuestionCircleIcon,
  SettingsIcon,
  UserIcon
} from "@/icons";

const routes = [
  {
    name: 'Başlıklar',
    path: '/',
    icon: <BaselineIcon width={18} />,
  },
  {
    name: 'Hakkımda Alanı',
    path: '/hakkimda',
    icon: <UserIcon width={18} />,
  },
  {
    name: 'Yazılar',
    path: '/yazilar',
    icon: <PenSquareIcon width={18} />,
  },
  {
    name: 'Yorumlar',
    path: '/yorumlar',
    icon: <ChatDotsIcon width={18} />,
  },
  {
    name: 'Hizmetler',
    path: '/hizmetler',
    icon: <GemIcon width={18} />,
  },
  {
    name: 'Sıkça Sorulan Sorular',
    path: '/sorular',
    icon: <QuestionCircleIcon width={18} />,
  },
  // {
  //   name: 'Foto Galeri',
  //   path: '/galeri',
  //   icon: <ImageIcon width={18} />,
  // },
  {
    name: 'İletişim Seçenekleri',
    path: '/iletisimler',
    icon: <NotificationIcon width={18} />,
  },
  {
    name: 'Genel Ayarlar',
    path: '/genel-ayarlar',
    icon: <SettingsIcon width={18} />,
  },
];

export const hiddenRoutes = [
  {
    name: 'Başlık Düzenle',
    path: 'baslik'
  },
  {
    name: 'Yazı Düzenle',
    path: 'yazi'
  },
  {
    name: 'Yazı Ekle',
    path: 'yazi-ekle'
  },
  {
    name: 'Soru Düzenle',
    path: 'soru'
  },
  {
    name: 'Soru Ekle',
    path: 'soru-ekle'
  },
  {
    name: 'Yorum Düzenle',
    path: 'yorum'
  },
  {
    name: 'Yorum Ekle',
    path: 'yorum-ekle'
  },
  {
    name: 'Hizmet Düzenle',
    path: 'hizmet'
  },
  {
    name: 'Hizmet Ekle',
    path: 'hizmet-ekle'
  },
  {
    name: 'İletişim Düzenle',
    path: 'iletisim'
  },
  {
    name: 'İletişim Ekle',
    path: 'iletisim-ekle'
  },
]

export default routes;
