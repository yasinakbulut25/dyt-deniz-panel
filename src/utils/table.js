import { transformArray } from "./tablesHelpers";
import * as ACTION_CREATORS from "@/store/actionCreators";

export const getSectionsTableData = (data) => {
  const transformKeys = [
    {
      key: 'publish',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Yayında',
        '0': 'Yayında Değil'
      }
    },
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/baslik/',
          text: 'Düzenle'
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Başlık", uid: "sectionTitle", type: 'text', sortable: true },
      { name: "Mini Başlık", uid: "sectionSubtitle", type: 'text', sortable: true },
      { name: "Açıklama", uid: "sectionDescription", type: 'text', sortable: true },
      { name: "Yayın Durumu", uid: "publish", type: 'chip', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'sectionTitle',
      placeholder: 'Başlığa göre ara..'
    },
    inititalVisibleColumns: ["sectionTitle", "sectionSubtitle", 'sectionDescription', 'publish', 'hash'],
  };

  return tableData;
}

export const getQuestionsTableData = (data) => {
  const transformKeys = [
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/soru/',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Soruyu Sil',
            description: 'Seçilen soru silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateQuestionAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Soru", uid: "question", type: 'text', sortable: true },
      { name: "Cevap", uid: "answer", type: 'text', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'question',
      placeholder: 'Soru ara..'
    },
    inititalVisibleColumns: ["question", "answer", 'hash']
  };

  return tableData;
}

export const getBlogsTableData = (data) => {
  const transformKeys = [
    {
      key: 'publish',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Yayında',
        '0': 'Yayında Değil'
      }
    },
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/yazi/',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Yazıyı Sil',
            description: 'Seçilen yazı silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateBlogAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Resim", uid: "image", type: 'image' },
      { name: "Tarih", uid: "date", type: 'text', sortable: true },
      { name: "Başlık", uid: "title", type: 'text', sortable: true },
      { name: "Yayın Durumu", uid: "publish", type: 'chip', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'title',
      placeholder: 'Başlığa göre ara..'
    },
    inititalVisibleColumns: ["image", "date", 'title', 'publish', 'hash'],
  };

  return tableData;
}

export const getCommentsTableData = (data) => {
  const transformKeys = [
    {
      key: 'publish',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Yayında',
        '0': 'Yayında Değil'
      }
    },
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/yorum/',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Yorumu Sil',
            description: 'Seçilen yorum silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateCommentAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Kişi", uid: "name", type: 'text', sortable: true },
      { name: "Tarih", uid: "date", type: 'text', sortable: true },
      { name: "Yorum", uid: "description", type: 'text', sortable: true },
      { name: "Yayın Durumu", uid: "publish", type: 'chip', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'name',
      placeholder: 'Kişiye göre ara..'
    },
    inititalVisibleColumns: ["name", "date", 'descriptionx', 'publish', 'hash'],
  };

  return tableData;
}

export const getServicesTableData = (data) => {
  const transformKeys = [
    {
      key: 'publish',
      transformType: 'STATUS',
      dynamicText: {
        '1': 'Yayında',
        '0': 'Yayında Değil'
      }
    },
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/hizmet/',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'Hizmeti Sil',
            description: 'Seçilen hizmet silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateServiceAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "İmage", uid: "image", type: 'image' },
      { name: "Başlık", uid: "title", type: 'text', sortable: true },
      { name: "Yayın Durumu", uid: "publish", type: 'chip', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'title',
      placeholder: 'Başlığa göre ara..'
    },
    inititalVisibleColumns: ["image", 'title', 'publish', 'hash'],
  };

  return tableData;
}

export const getContactsTableData = (data) => {
  const transformKeys = [
    {
      key: 'hash',
      actions: [
        {
          type: 'VIEW',
          path: '/iletisim/',
          text: 'Düzenle'
        },
        {
          type: 'DELETE',
          modalContent: {
            title: 'İletişimi Sil',
            description: 'Seçilen iletişim silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateContactAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "İletişim", uid: "title", type: 'text', sortable: true },
      { name: "Link", uid: "link", type: 'text', sortable: true },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'title',
      placeholder: 'İletişim ara..'
    },
    inititalVisibleColumns: ["title", "link", 'hash']
  };

  return tableData;
}

export const getGalleryTableData = (data) => {
  const transformKeys = [
    {
      key: 'hash',
      actions: [
        {
          type: 'DELETE',
          modalContent: {
            title: 'Fotoğrafı Sil',
            description: 'Seçilen fotoğraf silinecektir. Bu işlemi yapmak istediğinize emin misiniz?',
            endpoint: ACTION_CREATORS.updateGalleryAction
          }
        }
      ],
      urlPathKey: 'hash',
      transformType: 'ACTION',
    }
  ];

  const rows = data.length > 0 ? transformArray(data, transformKeys) : [];

  const tableData = {
    columns: [
      { name: "Resim", uid: "image", type: 'image' },
      { name: "Detay", uid: "hash", type: 'action' },
    ],
    rows: rows,
    searchColumnKey: {
      key: 'id',
      placeholder: ''
    },
    inititalVisibleColumns: ["image", 'hash']
  };

  tableData.rows = tableData.rows.reverse();
  return tableData;
}
