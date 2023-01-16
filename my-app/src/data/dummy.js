import React from 'react';
import { FaFileInvoice, FaJediOrder, FaRegListAlt, FaUserTie } from 'react-icons/fa';
import { MdOutlineRoom, MdSpaceDashboard } from 'react-icons/md';

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        forAll: true,
        parent: 1,
        path: 'dashboard',
        name: 'Overview',
        icon: <MdSpaceDashboard />,
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        module_id: 1,
        parent: 1,
        id: 2,
        path: 'teachers',
        name: 'teachers',
        icon: <FaUserTie />,
      },
      {
        module_id: 5,
        parent: 1,
        id: 3,
        path: 'rooms',
        name: 'rooms',
        icon: <MdOutlineRoom />,
      },
      {
        module_id: 6,
        parent: 1,
        id: 4,
        path: 'status',
        name: 'status',
        icon: <FaRegListAlt />,
      },
    ],
  },
];