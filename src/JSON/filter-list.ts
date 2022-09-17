import { bodies } from './bodies-list';
import { makes } from './make-list';
import { governates } from './governate';
export const filterList = [
  {
      _id:'1xxasdfn123',
      name: { en: 'Body', ar: 'الشكل' },
      path: 'Kbody',
      types: bodies,
      addVehicleOrder: 0,
      filterOrder: 0
  },
  {
    _id:'2xxasdfnsfsa',
    name: { en: 'Make', ar: 'شركة التصنيع' },
    path: 'Kmake',
    types: makes,
    addVehicleOrder: 1,
    filterOrder: 0
  },
  {
    _id: '62276e52de5b632b481db497',
    name: {
      en: 'Condition',
      ar: 'الحالة',
    },
    path: 'Condition',
    addVehicleOrder: 2,
    filterOrder: 0,
    types: [
      {
        _id: 'a83d7d24-5e48-4bd1-83a9-05d51b6fe839',
        name: {
          en: 'Used',
          ar: 'مستخدمة',
        },
      },
      {
        _id: 'c96de34f-2116-44ed-ada2-509bb993e36a',
        name: {
          en: 'New',
          ar: 'جديدة',
        },
      },
    ],
  },
  {
    _id: '62276e52de5b632b481db49e',
    name: {
      en: 'Model Year',
      ar: 'سنة الطراز',
    },
    path: 'Kyear',
    addVehicleOrder: 3,
    filterOrder: 0,
    types: [
      {
        _id: 'aa802a42-7009-4f25-a6dd-ac5dc39b9a32',
        name: {
          en: '2005',
          ar: '2005',
        },
        error: {
          en: 'Someting went wrong ',
          ar: 'Someting went wrong ',
        },
      },
      {
        _id: '9d7f878d-05d8-4090-81ae-847496b0d696',
        name: {
          en: '2004',
          ar: '2004',
        },
        error: {
          en: 'Someting went wrong ',
          ar: 'Someting went wrong ',
        },
      },
      {
        _id: 'e8df18b9-4c9b-454b-bc7c-3dc48f451df2',
        name: {
          en: '2003',
          ar: '2003',
        },
        error: {
          en: 'Someting went wrong ',
          ar: 'Someting went wrong ',
        },
      },
    ],
  },
];
