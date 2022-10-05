import { Link } from 'types';

export const sideLinks: Link[] = [
  {
    id: 'dashboard',
    href: '/dashboard',
    title: 'Warehouse',
  },
  {
    id: 'sorting',
    href: '/sorting',
    title: 'Sorting',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    links: [
      {
        id: 'pickup',
        href: '/tasks/pickup',
        title: 'Pickup',
      },
      {
        id: 'dropoff',
        href: '/tasks/dropoff',
        title: 'Dropoff',
      },
    ],
  },
  {
    id: 'map',
    href: '/map',
    title: 'Map',
    disabled: true,
  },
  {
    id: 'scanner',
    href: '/scanner',
    title: 'Scanner',
  },
];

export default sideLinks;
