import { ITab } from '../interfaces'
import { AttachmentType } from '../enums'

export const mocked_tabs: ITab[] = [
  {
    id: 'w12r2r',
    label: 'ПЗ1',
    items: [
      {
        id: 1,
        label: 'Методичні вказівки',
        type: AttachmentType.PDF,
        link: 'https://gromada.vmr.gov.ua/ContentLibrary/509c9390-3cb4-46c9-8ae8-f8d9fdf033f7/6/%D0%97%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B0%20%D0%B4%D0%B8%D1%82%D0%B8%D0%BD%D0%B0-%D0%BC%D0%B0%D0%B9%D0%B1%D1%83%D1%82%D0%BD%D1%94%20%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8%20.pdf?Mobile=1&Source=%2F%5Flayouts%2F15%2Fmobile%2Fviewa%2Easpx%3FList%3D7fc29db4%2Dadb7%2D4a18%2D8b7f%2Dcf6eb346501c%26View%3D1ef842c2%2D11cd%2D445a%2Db49c%2De667fb23295f%26RootFolder%3D%252FContentLibrary%252F509c9390%2D3cb4%2D46c9%2D8ae8%2Df8d9fdf033f7%252F6%26ViewMode%3DDetail%26wdFCCState%3D1%26PageFirstRow%3D171',
      },
      {
        id: 2,
        label: 'Відео про ММС та програму',
        type: AttachmentType.Video,
        link: 'https://www.pexels.com/ru-ru/video/6962458/',
      },
      {
        id: 3,
        label: 'Зовнішній ресурс на скачування',
        type: AttachmentType.SimpleLink,
        link: 'https://www.pexels.com/ru-ru/video/6962458/',
      },
    ],
  },
  {
    id: 'rweer3',
    label: 'ПЗ2',
    items: [],
  },
]
